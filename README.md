# Clash Configuration Generator (Edge)

A Cloudflare Worker-based subscription converter and configuration generator for Clash/Meta.

## Features

- **Multi-Subscription Support**: Combine multiple subscription URLs.
- **Dynamic Provider Groups**: Automatically generates `proxy-providers` for each subscription.
- **Split Auto-Grouping**: Creates individual `url-test` groups for each provider for better performance monitoring.
- **Hysteria2 Support**: Built-in parser for Hysteria2 URIs.
- **Optimized Templates**: Uses a separate template system for clean configuration management.
- **Node Chains (Relay)**: Support for traffic relaying through multiple nodes.
- **TypeScript**: Fully typed codebase for reliability.

## Features

### Node Chains (Relay)

The "Node Chain" (🔗 节点链) is a special proxy group type called `relay`. It allows you to chain multiple proxies together. Traffic will go through each proxy in the order they are listed.

- **How it works**: In the `template.ts`, the `🔗 节点链` group is configured to use `🚀 节点选择` and `{{AUTO_GROUPS_LIST}}`.
- **Order of Traffic**: Traffic -> Node 1 (Entry) -> Node 2 (Exit) -> Destination.
- **Use Case**: This is particularly useful for hiding your final exit node from your local ISP or for bypassing certain regional restrictions by using multiple hops.

## Usage

Deploy as a Cloudflare Worker and access via URL parameters:

`https://your-worker.workers.dev/?secret=YOUR_SECRET&Provider1=URL1&Provider2=URL2&proxies=CUSTOM_YAML_OR_URI`

### Parameters

- `secret`: (Optional) The secret to be used in the generated Clash configuration (e.g., for external control). Defaults to `edge-default`.
- `[ProviderName]=[SubscriptionURL]`: Add any number of subscriptions.
- `proxies`: (Optional) Add custom YAML proxies or a Hysteria2 URI.

## Development

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Local testing:
   ```bash
   npm test
   ```

### Project Structure

- `index.ts`: Main Worker entry point.
- `template.ts`: YAML configuration templates.
- `local-test.ts`: Test script for local development.
- `wrangler.toml`: Cloudflare Workers configuration.

## Deployment

Deploy using Wrangler:

```bash
npx wrangler deploy
```
