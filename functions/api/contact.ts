// Cloudflare Pages Function — ポートフォリオの問い合わせ受け口（/api/contact）。
// 静的export(out/)と併せて wrangler pages deploy が functions/ を自動でFunction化する。
// キー未設定でも壊れない設計：TURNSTILE_SECRET_KEY があれば bot検証、RESEND_API_KEY があれば送信。
interface Env {
  TURNSTILE_SECRET_KEY?: string
  RESEND_API_KEY?: string
  CONTACT_TO_EMAIL?: string     // 送信先（未設定なら既定の連絡先）
  CONTACT_FROM_EMAIL?: string   // 送信元（Resend検証済みドメイン。未設定なら onboarding@resend.dev）
}

// 受信先はコードに置かず、非公開の env（CONTACT_TO_EMAIL）でのみ指定する
const DEFAULT_FROM = 'ポートフォリオ お問い合わせ <onboarding@resend.dev>'

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

// メール本文へのHTML/ヘッダ注入対策
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function onRequestPost(ctx: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = ctx

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: '不正なリクエストです' }, 400)
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()

  // Honeypot: 隠しフィールドが埋まっていたらボットとみなし、成功を装って無視する
  if (String(body._hp ?? '').trim()) return json({ ok: true })

  // 入力検証（長さ・型・形式）
  if (!name || name.length > 100) return json({ error: 'お名前をご確認ください' }, 400)
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) {
    return json({ error: 'メールアドレスの形式をご確認ください' }, 400)
  }
  if (!message || message.length > 4000) return json({ error: 'お問い合わせ内容をご確認ください' }, 400)

  // Turnstile（設定されている場合のみ・bot対策）
  if (env.TURNSTILE_SECRET_KEY) {
    const token = String(body.turnstileToken ?? '')
    if (!token) return json({ error: '認証を完了してください' }, 400)
    const ip = request.headers.get('cf-connecting-ip') ?? ''
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        ...(ip && { remoteip: ip }),
      }),
    })
    const result = (await verify.json()) as { success?: boolean }
    if (!result.success) return json({ error: '認証に失敗しました。もう一度お試しください' }, 400)
  }

  // 送信（Resend。未設定なら送信できないので明示エラー）
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    return json({ error: '送信を受け付けできませんでした。時間をおいて再度お試しください' }, 503)
  }
  const to = env.CONTACT_TO_EMAIL
  const from = env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `【お問い合わせ】${name} 様`,
      html:
        `<p><strong>お名前</strong>：${escapeHtml(name)}</p>` +
        `<p><strong>メール</strong>：${escapeHtml(email)}</p>` +
        `<p><strong>内容</strong>：<br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    }),
  })

  if (!res.ok) {
    return json({ error: '送信に失敗しました。時間をおいて再度お試しください' }, 502)
  }
  return json({ ok: true })
}
