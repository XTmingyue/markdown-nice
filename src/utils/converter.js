import juice from "juice";
import {message} from "antd";
import {
  BASIC_THEME_ID,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID,
  LAYOUT_ID,
  BOX_ID,
  FONT_THEME_ID,
  MJX_DATA_FORMULA,
} from "./constant";

export const solveWeChatMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  for (let i = 0; i < mjxs.length; i++) {
    const mjx = mjxs[i];
    if (!mjx.hasAttribute("jax")) {
      break;
    }

    // mjx.removeAttribute("data");
    mjx.removeAttribute("jax");
    mjx.removeAttribute("display");
    mjx.removeAttribute("tabindex");
    mjx.removeAttribute("ctxtmenu_counter");
    const svg = mjx.firstChild;
    const width = svg.getAttribute("width");
    const height = svg.getAttribute("height");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = width;
    svg.style.height = height;
  }
};

export const solveZhihuMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  while (mjxs.length > 0) {
    const mjx = mjxs[0];
    let data = mjx.getAttribute(MJX_DATA_FORMULA);
    if (!data) {
      continue;
    }

    if (mjx.hasAttribute("display") && data.indexOf("\\tag") === -1) {
      data += "\\\\";
    }

    mjx.outerHTML = '<img class="Formula-image" data-eeimg="true" src="" alt="' + data + '">';
  }
};

export const solveJuejinMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  while (mjxs.length > 0) {
    const mjx = mjxs[0];
    const data = mjx.getAttribute(MJX_DATA_FORMULA);
    if (!data) {
      continue;
    }

    // 行间公式
    if (mjx.hasAttribute("display")) {
      mjx.outerHTML = `<figure><img class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></figure>`;
    }
    // 行内公式
    else {
      mjx.outerHTML = `<span><img style="display:inline;" class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></span>`;
    }
  }
};

// 掘金单独处理代码块
export const solveJuejinCode = (html) => {
  // 掘金代码不换行问题
  const brReg = /<pre([^>])*class="custom"([^>])*>(.*?)<\/pre>/g;
  const brMatchList = html.match(brReg);
  if (brMatchList) {
    for (const item of brMatchList) {
      const content = item
        .replace(/display: -webkit-box;/g, "display: block;") // -webkit-box替换为block
        .replace(/<br>/g, "\n<span/>") // <br>替换为\n<span/>
        .replace(/&nbsp;/g, " "); // 空格转回，不转回遇到 "$ " 情况会出现问题

      html = html.replace(item, content);
    }
  }
  return html;
};

export const addJuejinSuffix = () => {
  const suffix = document.createElement("p");
  suffix.id = "nice-suffix-juejin-container";
  suffix.className = "nice-suffix-juejin-container";
  suffix.innerHTML = `本文使用 <a href="https://wechat.jeffjade.com/">「Markdown 在线编辑器 | 公众号内容排版工具」</a> 排版`;

  const element = document.getElementById(LAYOUT_ID);
  element.appendChild(suffix);
};

// 雁栖湖等主题 h1:before 的样式（用于复制时给 .prefix 加内联样式，避免粘贴到公众号后 Part 不显示）
const H1_PREFIX_INLINE_STYLE = "display:inline-block;background:rgb(37,132,181);color:white;padding:2px 8px;";

// 若当前主题使用 CSS counter 生成标题前缀（如雁栖湖的 Part 1），复制时 juice 不会解析 counter()
// 导致粘贴到公众号出现 "Part'counter(counterh1)" 或 "counter(counterh2)"。复制前将 "Part N" 写入 h1 的 .prefix，
// 并去掉 h1/h2... 的 :before content，避免字面量粘贴
function resolveCounterPrefixForCopy(container, markdownStyle) {
  if (!container || !markdownStyle) return markdownStyle;

  const getInlineStyle = (selector) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const reg = new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, "m");
    const match = markdownStyle.match(reg);
    if (!match) return "";
    const inline = match[1]
      .split(";")
      .map((item) => item.trim())
      .filter((item) => item && !/^content\s*:/.test(item) && !/^counter-increment\s*:/.test(item))
      .join("; ");
    return inline ? `${inline};` : "";
  };

  const getMergedInlineStyle = (selectors) =>
    selectors
      .map((selector) => getInlineStyle(selector))
      .filter(Boolean)
      .join(" ");

  // 处理 h1 的 Part N
  if (/counter\(counterh1\)/.test(markdownStyle)) {
    const h1List = container.querySelectorAll("h1");
    let n = 0;
    h1List.forEach((h1) => {
      const prefix = h1.querySelector(".prefix");
      if (prefix) {
        n += 1;
        prefix.textContent = `Part ${n}`;
        // .prefix 在主题里多为空，复制后无样式会导致公众号不显示。加上与 h1:before 一致的内联样式
        prefix.setAttribute("style", H1_PREFIX_INLINE_STYLE);
      }
    });
    markdownStyle = markdownStyle.replace(
      /(#nice\s+h1\s*:before\s*\{[\s\S]*?)content\s*:\s*[^;]+;/g,
      "$1content: none; display: none;",
    );
  }

  // 统一移除 h2-h6 使用 counter 的 :before content，避免 "counter(counterh2)" 被内联为字面量
  for (let level = 2; level <= 6; level++) {
    const counterReg = new RegExp(`counter\\(counterh${level}\\)`);
    if (counterReg.test(markdownStyle)) {
      const prefixStyle = getMergedInlineStyle([`#nice h${level} .prefix`, `#nice h${level} .prefix:before`]);
      const headingList = container.querySelectorAll(`h${level}`);
      let n = 0;
      headingList.forEach((heading) => {
        const prefix = heading.querySelector(".prefix");
        if (prefix) {
          n += 1;
          prefix.textContent = `${n}`;
          if (prefixStyle) {
            // 强制 vertical-align: bottom 以确保与 content 对齐
            prefix.setAttribute("style", `${prefixStyle}; vertical-align: bottom;`);
          }
          // 只有当存在 prefix 时，才强制 content 为 inline-block 并底部对齐，
          // 这样可以解决两个 inline 元素（或 inline-block）基线对齐导致的下划线错位问题
          const content = heading.querySelector(".content");
          if (content) {
            const currentStyle = content.getAttribute("style") || "";
            // 追加 display: inline-block 和 vertical-align: bottom
            // 注意：juice 后续会内联 CSS，但行内 style 优先级高，或者会被 juice 合并保留
            content.setAttribute("style", `${currentStyle}; display: inline-block; vertical-align: bottom;`);
          }
        }
      });
      const beforeReg = new RegExp(`(#nice\\s+h${level}\\s*:before\\s*\\{[\\s\\S]*?)content\\s*:\\s*[^;]+;`, "g");
      markdownStyle = markdownStyle.replace(beforeReg, "$1content: none; display: none;");
      const prefixBeforeReg = new RegExp(
        `(#nice\\s+h${level}\\s+\\.prefix\\s*:before\\s*\\{[\\s\\S]*?)content\\s*:\\s*[^;]+;`,
        "g",
      );
      markdownStyle = markdownStyle.replace(prefixBeforeReg, "$1content: none; display: none;");
    }
  }

  return markdownStyle;
}

export const solveHtml = () => {
  const element = document.getElementById(BOX_ID);
  const container = element && element.children[0];

  const inner = container ? container.children : [];
  for (const item of inner) {
    item.setAttribute("data-tool", "mdnice编辑器");
  }

  const basicStyle = document.getElementById(BASIC_THEME_ID).innerText;
  let markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText;
  const codeStyle = document.getElementById(CODE_THEME_ID).innerText;
  const fontStyle = document.getElementById(FONT_THEME_ID).innerText;

  markdownStyle = resolveCounterPrefixForCopy(container, markdownStyle);

  let html = element.innerHTML;
  html = html.replace(/<mjx-container (class="inline.+?)<\/mjx-container>/g, "<span $1</span>");
  html = html.replace(/\s<span class="inline/g, '&nbsp;<span class="inline');
  html = html.replace(/svg><\/span>\s/g, "svg></span>&nbsp;");
  html = html.replace(/mjx-container/g, "section");
  html = html.replace(/class="mjx-solid"/g, 'fill="none" stroke-width="70"');
  html = html.replace(/<mjx-assistive-mml.+?<\/mjx-assistive-mml>/g, "");
  let res = "";
  try {
    res = juice.inlineContent(html, basicStyle + markdownStyle + codeStyle + fontStyle, {
      inlinePseudoElements: true,
      preserveImportant: true,
    });
  } catch (e) {
    message.error("请检查 CSS 文件是否编写正确！");
  }

  return res;
};

export const copySafari = (text) => {
  // 获取 input
  let input = document.getElementById("copy-input");
  if (!input) {
    // input 不能用 CSS 隐藏，必须在页面内存在。
    input = document.createElement("input");
    input.id = "copy-input";
    input.style.position = "absolute";
    input.style.left = "-1000px";
    input.style.zIndex = "-1000";
    document.body.appendChild(input);
  }
  // 让 input 选中一个字符，无所谓那个字符
  input.value = "NOTHING";
  input.setSelectionRange(0, 1);
  input.focus();

  // 复制触发
  document.addEventListener("copy", function copyCall(e) {
    e.preventDefault();
    e.clipboardData.setData("text/html", text);
    e.clipboardData.setData("text/plain", text);
    document.removeEventListener("copy", copyCall);
  });
  document.execCommand("copy");
};
