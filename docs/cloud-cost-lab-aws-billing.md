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

Never commit credentials, place them in `NEXT_PUBLIC_*` variables, paste them into source code, or send them in chat. After saving variables, redeploy the relevant environment so the server route receives them.

## 3. Endpoint

`GET /api/cloud-cost-lab/billing?days=30`

- Calls AWS Cost Explorer `GetCostAndUsage` with SigV4 signing on the server.
- Returns monthly unblended cost grouped by AWS service.
- Accepts a 7–90 day window; defaults to 30.
- Uses private, no-store response caching.
- Returns an explicit not-configured state when credentials are absent.
- The browser never receives AWS credentials.

Billing data can be delayed by AWS and can include credits, discounts, taxes or support charges differently depending on the selected metric. Reconcile results against the AWS Billing console and invoice before financial reporting.

## 4. Verify after deployment

1. Open the Cloud Cost Lab landing page.
2. Confirm the AWS Cost Explorer panel reports Connected.
3. Open `/api/cloud-cost-lab/billing?days=30` and confirm `connected: true`, currency, period and service totals.
4. Compare the service totals with Cost Explorer for the same account, metric and date range.
5. If the API reports AccessDenied, check the IAM policy and the credentials' account. If it reports not configured, check the Vercel environment and redeploy.

## 5. Security and operational notes

The endpoint is a read-only billing view. Before exposing it to a multi-tenant or public production audience, add application-level authorization and account/tenant scoping so only approved users can view the organization's billing data. Do not rely on an unguessable URL as access control.
