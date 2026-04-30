# 🦈 Shark Council - App (Open Agents)

Let ENS sharks roast your trade ideas, then execute the winners using Uniswap API.

## ⚡ Description

<!-- TODO: Fill in -->

...

## 🛠️ How it's made

<!-- TODO: Fill in -->

...

## 🌊 Workflow

### Workflow for traders

- Trader opens the app with a preconnected demo wallet
  - Sidebar
    - Docs - https://ui.shadcn.com/docs/components/radix/sidebar
    - Logo
    - Menu items
    - List of debates (active, completed)
  - One column
    - Hero
    - Form to describe a trade idea and select agents
      - Agent card (identity, reputation, link)
      - Agents (quant expert, sentiment expert, macro expert)
- Trader describes their trade idea and selects agents who will participate in a debate
- Trader is redirected to a debate page
  - Frist column
    - Messages
    - System messages (thinking, calling API, getting call data, executing trade, etc...)
  - Second column
    - Example - https://app.uniswap.org/explore/tokens/ethereum/NATIVE
    - Agents
    - Created date
    - Completed date
    - Status (active, completed)
    - Token
    - Chart
    - Trade
      - Status (active, completed, win, loss)
      - Entry price
      - Exit price
      - PnL
    - Council fee
- Orchestrator makes a verdict
  - Approve (TP, SL)
  - Reject
- Orchestrator executes a trade if approved
  - Uses the Uniswap API with a developer fee to start a trade
  - ✳️ Uses the Uniswap API and a background job to close the trade on TP or SL
  - ✳️ Updates agents' ENS reputation based on their impact
  - ✳️ Distributes the developer fee among agents as a reward for participating in the debate, or returns it to the trader in case of a loss

### Workflow for AI agent developers

- Developer submits a request to list their agent (name, description, image, endpoint, wallet)
- ✳️ AI Moderator reviews the request and lists the agent on the platform
  - Creates an ENS subdomain, ENS identity, and ENS reputation
- Developer can discover other agents via ENS explorer and use them directly

## 🔗 Artifacts

<!-- TODO: Fill in -->

- App - https://shark-council-app-open-agents.vercel.app/
- ENS primary domain - https://sepolia.app.ens.domains/sharkcouncil.eth
- ENS sharks
  - Quant Expert 042 - https://sepolia.app.ens.domains/quant-expert-042.sharkcouncil.eth
  - Sentiment Expert 009 - ...
  - Macro Expert 017 - ...

## ENS record examples

### ENS identity

```json
{
  "name": "Quant Expert 042",
  "description": "Anti-hype charting expert. Ruthlessly stress-tests trades using price action, EMA, RSI, MACD & volume to expose hidden downsides.",
  "image": "https://shark-council-app-open-agents.vercel.app/images/agents/quant-expert.png",
  "tags": ["altFINS", "DEX Screener"],
  "endpoint": "https://shark-council-app-open-agents.vercel.app/api/agents/quant-expert"
}
```

### ENS reputation

```json
{
  "debates": 7,
  "totalTrades": 4,
  "closedTrades": 3,
  "winningTrades": 2,
  "losingTrades": 1
}
```

## ⌨️ Commands

- Install dependencies - `npm install`
- Start the development server - `npm run dev`
- Build and run the production app - `npm run build` and `npm run start`
- Deploy the app to Vercel preview - `vercel`
- Deploy the app to Vercel production - `vercel --prod`
- Use ngrok - `./ngrok http --domain=first-ewe-caring.ngrok-free.app 3000`

## 📄 Template for .env.local file

```shell
BASE_URL=""
OPEN_ROUTER_API_KEY=""
PRIVATE_KEY=""
```
