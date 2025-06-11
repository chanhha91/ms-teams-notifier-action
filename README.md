# 📢 MS Teams Notifier Pro

A GitHub Action that sends beautifully formatted **Message Cards** to Microsoft Teams channels using Incoming Webhooks.

## ✅ Features

- Custom title, message, and summary
- Supports **facts** (key-value pairs)
- Supports **buttons** with custom URLs
- Clean markdown formatting
- Simple to configure and use

## 📦 Inputs

| Name         | Required | Description |
|--------------|----------|-------------|
| `webhook_url`| ✅       | MS Teams Incoming Webhook URL |
| `title`      | ❌       | Card title (default: "GitHub Notification") |
| `summary`    | ❌       | Summary shown in Teams notification feed |
| `theme_color`| ❌       | Hex color (e.g., `FF5733`, default: `0076D7`) |
| `text`       | ❌       | Main card message (supports markdown) |
| `facts`      | ❌       | JSON array of `{ "name": "", "value": "" }` |
| `actions`    | ❌       | JSON array of `{ "name": "", "url": "" }` |

## 📋 Example Usage

```yaml
- uses: chanhha91/ms-teams-notifier-action@v1
  with:
    webhook_url: ${{ secrets.TEAMS_WEBHOOK_URL }}
    title: "🚀 Deployment Complete"
    summary: "Prod deployment done"
    theme_color: "00CC99"
    text: |
      Deployed by `${{ github.actor }}` from `${{ github.repository }}`
    facts: |
      [
        { "name": "Ref", "value": "${{ github.ref }}" },
        { "name": "Commit", "value": "${{ github.sha }}" }
      ]
    actions: |
      [
        { "name": "View Repo", "url": "https://github.com/${{ github.repository }}" },
        { "name": "Open Workflow", "url": "https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}" }
      ]