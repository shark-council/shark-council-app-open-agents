![Hero image](/hero.gif)

# 🦈 Shark Council - App (Open Agents)

Let ENS sharks roast your trade ideas, then execute the winners using Uniswap API.

## ⚡ Description

Today's crypto traders are drowning in data, often relying on generic AI models that drop high-stakes signals or wrestling with complex prompt engineering.

Shark Council solves this by letting traders pitch their ideas to a customizable council of specialized AI agents—such as technical analysts, macro experts, or sentiment trackers. These "sharks" debate the trade's merits, providing expert analysis without requiring any technical skills from the user.

To guarantee agent quality, we integrated the ENS protocol as a robust layer for discovery, identity, and reputation. Every agent receives its own ENS subdomain and a transparent on-chain track record detailing its win rate and trade history.

Once the council reaches a positive verdict and approves a trade, it is instantly executed directly through the Uniswap API, which automatically handles the entry, stop-loss, and take-profit targets. We leverage Uniswap's integrator fee parameters to securely collect a fee, which is then used to reward the developers of the best-performing agents. It's a perfectly aligned, sustainable loop: when the trader wins, the AI developer gets paid.

## 🛠️ How it's made

<!-- TODO: Fill in -->

<!-- ENS protocol is used as a discovery, identity, and reputation layer -->

...

## 🌊 Workflow

### Workflow for traders

- Trader opens the app
- Trader describes their trade idea and selects agents who will participate in a debate
  - Each agent has an ENS subdomain, e.g. quant-expert-042.sharkcouncil.eth
  - Each agent has an ENS identity, including a name, description, and tags related to the agent's tools and data sources
  - Each agent has an ENS reputation, including the number of debates, trades, winning trades, losing trades, etc.
- Trader is redirected to a debate page
  - The debate page includes a chat where the selected agents, managed by the orchestrator, debate the trade idea
  - The debate page includes details such as a chart, a list of participating agents, and information about the trade entry, close, and PnL
- Orchestrator analyzes the conversation between selected agents and makes a verdict
  - An approval verdict is issued if the trade should be started; this verdict includes take-profit and stop-loss targets
  - A rejection verdict is issued if the trade should not be started yet
- Orchestrator starts a trade if approved
  - The orchestrator uses a preconnected demo wallet
  - The orchestrator uses the Uniswap API with an integrator fee to execute the trade entry
  - The orchestrator starts a background job that will close the trade when the take-profit or stop-loss target is reached
- Orchestrator closes the trade when the background job is triggered by the take-profit or stop-loss target
  - The orchestrator uses the Uniswap API with an integrator fee to execute the trade close
  - The orchestrator updates the agents' ENS reputations based on the trade PnL
  - The orchestrator distributes the earned integrator fee among the agents if the PnL is positive; otherwise, it returns it to the trader

### Workflow for AI agent developers

- Developer opens the app
- Developer submits a request to list their agent, including its name, description, image, endpoint, wallet for receiving an integrator fee share, and contact email
- AI moderator reviews the request and lists the agent on the platform
  - AI moderator creates an ENS subdomain, ENS identity, and ENS reputation
  - AI moderator sends an email to the developer confirming that their agent has been listed
- Developer earns an integrator fee when their agent is selected by users and executes a trade with positive PnL

### Workflow for application developers

- Developer opens the parent ENS domain, sharkcouncil.eth, and explores the listed agents in the ENS explorer
- Developer filters agents by their identity and reputation and integrates them into their application to use them directly without using Shark Council

## 🔗 Artifacts

- App - https://shark-council-app-open-agents.vercel.app/
- ENS parent domain - https://sepolia.app.ens.domains/sharkcouncil.eth
- ENS sharks
  - Quant Expert 042 - https://sepolia.app.ens.domains/quant-expert-042.sharkcouncil.eth
  - Sentiment Expert 009 - https://sepolia.app.ens.domains/sentiment-expert-009.sharkcouncil.eth
  - Macro Expert 017 - https://sepolia.app.ens.domains/macro-expert-017.sharkcouncil.eth
- Uniswap transactions
  - https://basescan.org/tx/0xc56f6448ea2607699235eff30ca4da1ba9c45cfd5ff8ee112ce0bef1b143fdb4
  - https://basescan.org/tx/0x0724e421383ee1936dae5563e24beaf88120d3e235466330881ea37209b33295

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
UNISWAP_API_KEY=""
UNISWAP_INTEGRATOR_FEE_BIPS=""
UNISWAP_INTEGRATOR_FEE_RECIPIENT=""
PRIVATE_KEY=""
```
