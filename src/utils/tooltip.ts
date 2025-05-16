export function showCustomTooltip(
    target: HTMLElement,
    text: string | null,
    wrapper?: HTMLElement | null
  ) {
    if (!text || !wrapper) return;
  
    let tooltip = wrapper.querySelector<HTMLDivElement>("#my-toast-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "my-toast-tooltip";
      tooltip.className = "custom-toast-tooltip";
      tooltip.innerHTML = `
        <div class="arrow"></div>
        <span class="text"></span>
      `;
      wrapper.appendChild(tooltip); // wrapper 안에 추가
    }
  
    const span = tooltip.querySelector(".text");
    if (span) span.textContent = text;
  
    const rect = target.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
  
    const offsetTop = rect.top - wrapperRect.top;
    const offsetLeft = rect.left - wrapperRect.left;
  
    tooltip.style.left = `${offsetLeft + rect.width / 2}px`;
    tooltip.style.top = `${offsetTop - 40}px`;
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.opacity = "1";
    tooltip.style.display = "block";
  }
  
  export function hideCustomTooltip() {
    const tooltip = document.getElementById("my-toast-tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
    }
  }