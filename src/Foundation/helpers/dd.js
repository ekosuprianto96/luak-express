'use strict';

const { AsyncLocalStorage } = require('async_hooks');
const util = require('util');

// Store req/res per-request in an async-safe manner
const requestContext = new AsyncLocalStorage();

/**
 * Middleware to run the request within the AsyncLocalStorage context.
 */
function ddContextMiddleware(req, res, next) {
    const app = require('../../../bootstrap/app');
    requestContext.run({ req, res, app }, next);
}

/**
 * Core dd() - Dump and Die
 * 
 * @param  {...any} args 
 */
function dd(...args) {
    const store = requestContext.getStore();

    const dumps = args.map((arg, i) => ({
        index: i,
        type: getType(arg),
        value: util.inspect(arg, {
            depth: 8,
            colors: false,
            breakLength: 80,
            compact: false,
        }),
        raw: arg,
    }));

    // If we have a response object and headers haven't been sent, send the HTML dump
    if (store?.res && !store.res.headersSent) {
        store.res.status(200).send(renderHtml(dumps, new Error().stack));
    }

    // Stop execution by throwing a special error
    const err = new Error('dd() called — execution stopped');
    err.isDumpAndDie = true;
    throw err;
}

/**
 * d() - Dump without Die
 * 
 * @param  {...any} args 
 */
function d(...args) {
    const store = requestContext.getStore();
    if (!store?.res || store.res.headersSent) return;

    // Store dumps in res.locals to be flushed later or just log them
    // For now, let's just log them to the console as well for convenience
    console.log('--- Dump ---');
    args.forEach(arg => console.log(util.inspect(arg, { colors: true, depth: 4 })));
    console.log('------------');
}

/**
 * Get internal type of a value.
 */
function getType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return `Array(${value.length})`;
    if (value instanceof Error) return `Error`;
    if (value instanceof Date) return `Date`;
    if (value instanceof Map) return `Map(${value.size})`;
    if (value instanceof Set) return `Set(${value.size})`;
    if (Buffer.isBuffer(value)) return `Buffer`;
    return typeof value;
}

/**
 * Render the premium HTML dump page.
 */
function renderHtml(dumps, callerStack) {
    const store = requestContext.getStore();
    const callerLine = (callerStack || '')
        .split('\n')
        .slice(2)
        .find(l => l.trim().startsWith('at ') && !l.includes('/helpers/dd')) || '';

    const callerInfo = callerLine.trim().replace(/^at /, '');

    const blocks = dumps.map((d, i) => `
        <div class="dump-block">
            <div class="dump-header">
                <span class="dump-index">#${i}</span>
                <span class="dump-type">${escapeHtml(d.type)}</span>
                ${dumps.length > 1 ? `<span class="dump-count">${i + 1} / ${dumps.length}</span>` : ''}
            </div>
            <pre class="dump-body">${escapeHtml(d.value)}</pre>
        </div>
    `).join('');

    const config = store.app ? store.app.make('config') : null;
    const appName = config ? config.get('app.name', 'Luak Express') : 'Luak Express';
    const appVersion = store.app ? store.app.version() : '1.0.0';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dd() — ${escapeHtml(appName)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --bg:          #06080e;
            --surface:     #0c1018;
            --elevated:    #131922;
            --raised:      #1a2130;
            --border:      rgba(255,255,255,0.055);
            --border-hi:   rgba(255,255,255,0.12);
            --text-1:      #dde6f0;
            --text-2:      #8899aa;
            --text-3:      #3d4f62;

            --accent:      #ff4545;
            --accent-bg:   rgba(255, 69, 69, 0.07);
            --accent-border:rgba(255, 69, 69, 0.2);

            --app:         #00d97e;
            --app-bg:      rgba(0, 217, 126, 0.06);
            --app-border:  rgba(0, 217, 126, 0.2);

            --fn:          #b79eff;
            --file:        #5eaeff;
            --line-num:    #ffc145;

            --r-sm: 6px;
            --r:    12px;
            --r-lg: 18px;
        }
        body {
            font-family: 'IBM Plex Sans', sans-serif;
            background: var(--bg);
            color: var(--text-1);
            min-height: 100vh;
        }

        /* TOP BAR */
        .topbar {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(6,8,14,0.82);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border);
            height: 54px;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--text-1);
            letter-spacing: -0.01em;
            text-decoration: none;
        }
        .logo-mark {
            width: 28px;
            height: 28px;
            border-radius: 8px;
            background: linear-gradient(140deg, #ff4545 0%, #ff8c00 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-weight: 800;
            color: white;
            letter-spacing: -0.05em;
            flex-shrink: 0;
        }
        .status-badge {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.72rem;
            color: var(--accent);
            background: var(--accent-bg);
            border: 1px solid var(--accent-border);
            padding: 3px 11px;
            border-radius: 99px;
            letter-spacing: 0.04em;
        }

        /* MAIN */
        .main {
            max-width: 1080px;
            margin: 0 auto;
            padding: 3rem 2rem 5rem;
        }

        /* CALLER */
        .caller {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: var(--elevated);
            border: 1px solid var(--border);
            padding: 10px 16px;
            border-radius: var(--r-sm);
            margin-bottom: 2.5rem;
            animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .caller-label {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.72rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--accent);
        }
        .caller-info {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.78rem;
            color: var(--text-2);
        }

        /* DUMPS */
        .dumps {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .dump-block {
            border: 1px solid var(--border);
            border-radius: var(--r-sm);
            overflow: hidden;
            background: var(--surface);
            transition: border-color 0.15s ease, background 0.15s ease;
            animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
            animation-delay: 0.1s;
        }
        .dump-block:hover {
            border-color: var(--border-hi);
            background: var(--elevated);
        }

        .dump-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 16px;
            background: var(--elevated);
            border-bottom: 1px solid var(--border);
        }
        .dump-index {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.65rem;
            color: var(--text-3);
            border-right: 1px solid var(--border);
            padding-right: 12px;
            margin-right: -4px;
        }
        .dump-type {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--app);
        }
        .dump-count {
            margin-left: auto;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.65rem;
            color: var(--text-3);
        }

        .dump-body {
            padding: 1.25rem 1.75rem;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.82rem;
            color: var(--text-2);
            white-space: pre-wrap;
            word-wrap: break-word;
            line-height: 1.7;
            overflow-x: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--border-hi) transparent;
        }

        /* FOOTER */
        .footer {
            text-align: center;
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
            font-size: 0.72rem;
            color: var(--text-3);
            letter-spacing: 0.04em;
        }

        @media (max-width: 600px) {
            .main { padding: 2rem 1rem 4rem; }
            .topbar { padding: 0 1rem; }
        }
    </style>
</head>
<body>
    <div class="topbar">
        <a href="/" class="logo">
            <div class="logo-mark">Le</div>
            ${escapeHtml(appName)}
        </a>
        <div class="topbar-right">
            <span class="status-badge">dd() · Execution Stopped</span>
        </div>
    </div>

    <div class="main">
        <div class="caller">
            <span class="caller-label">Called at</span>
            <span class="caller-info">${escapeHtml(callerInfo || 'unknown location')}</span>
        </div>

        <div class="dumps">
            ${blocks}
        </div>

        <div class="footer">${escapeHtml(appName)} Framework &nbsp;·&nbsp; v${escapeHtml(appVersion)}</div>
    </div>
</body>
</html>`;
}

/**
 * Handle HTML escaping.
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

module.exports = { dd, d, ddContextMiddleware, requestContext };
