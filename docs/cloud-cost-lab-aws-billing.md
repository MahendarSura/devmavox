# Cloud Cost Lab — AWS Cost Explorer connection

The Cloud Cost Lab can display real AWS Cost Explorer spend after the deployment environment is configured. Until then, the dashboard intentionally shows **Not connected**; the savings workbench is illustrative and is not represented as live billing.

## 1. IAM policy

Create a dedicated IAM principal for the application and attach a narrowly scoped policy. The billing endpoint currently calls only `ce:GetCostAndUsage`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadCostAndUsage",
      "Effect": "Allow",
      "Action": ["ce:GetCostAndUsage"],
      "Resource": "*"
    }
  ]
}
```

Cost Explorer is an account-level billing API; the action uses `Resource: "*"`. Do not attach administrator or write permissions. Prefer temporary credentials/role-based credentials where the hosting environment supports them.

## 2. Vercel environment variables

Add these to the DevMavox Vercel project for the environments that should display billing:

- `AWS_ACCESS_KEY_ID` — dedicated read-only IAM access key ID
- `AWS_SECRET_ACCESS_KEY` — matching secret access key
- `AWS_SESSION_TOKEN` — only when using temporary STS credentials
- `AWS_COST_EXPLORER_REGION` — optional; defaults to `us-east-1`
- `CLOUD_COST_LAB_BILLING_ACCESS_KEY` — required separate access key used to authorize the billing view

Never commit credentials, place them in `NEXT_PUBLIC_*` variables, paste them into source code, or send them in chat. After saving variables, redeploy the relevant environment so the server route receives them. Give the separate billing access key only to authorized finance/platform users; they enter it in the Cloud Cost Lab panel. Do not use the AWS secret access key as this application access key.

## 3. Endpoint

`GET /api/cloud-cost-lab/billing?days=30`

- Calls AWS Cost Explorer `GetCostAndUsage` with SigV4 signing on the server.
- Returns monthly unblended cost grouped by AWS service.
- Accepts a 7–90 day window; defaults to 30.
- Uses private, no-store response caching.
- Requires a separate `CLOUD_COST_LAB_BILLING_ACCESS_KEY` bearer token before it can query AWS. Returns an explicit not-configured state when AWS credentials are absent.
- The browser never receives AWS credentials.

Billing data can be delayed by AWS and can include credits, discounts, taxes or support charges differently depending on the selected metric. Reconcile results against the AWS Billing console and invoice before financial reporting.

## 4. Verify after deployment

1. Open the Cloud Cost Lab landing page.
2. Confirm the AWS Cost Explorer panel reports Connected.
3. Open `/api/cloud-cost-lab/billing?days=30` and confirm `connected: true`, currency, period and service totals.
4. Compare the service totals with Cost Explorer for the same account, metric and date range.
5. If the API reports AccessDenied, check the IAM policy and the credentials' account. If it reports not configured, check the Vercel environment and redeploy.

## 5. Security and operational notes

The endpoint requires a separate shared access key and uses constant-time comparison for the configured token. The UI keeps the entered key in component memory only; it is not stored in local storage or exposed as a public environment variable. Rotate the access key if it is shared outside the approved group. For multi-tenant use, replace the shared-key gate with authenticated user identity and account/tenant-level authorization before enabling access across organizations. Do not rely on an unguessable URL as access control.
