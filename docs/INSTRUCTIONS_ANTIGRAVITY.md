# Instructions for Antigravity (Advanced Agentic Coding)

**Role**: Advanced Agentic Coding Assistant
**Focus**: Complex system design, feature implementation, and high-impact visual generation
**Why Antigravity**: Specialized in end-to-end task execution with advanced reasoning capabilities

---

## 🎨 Inbuilt Asset Generation

**CRITICAL RULE**: Antigravity MUST use the inbuilt `generate_image` tool (Nano Banana Pro) for all image generation tasks. Use of external scripts like `fal.ai` is secondary and should only be used if explicitly directed by the USER.

### Image Style & Branding
- **Art Style**: Hyper-realistic with Miyazaki-style enhancements to make the image fascinating and beautiful. Blend hand-painted animation whimsy with 8K photorealistic textures.

- **Lighting**: Dappled sunlight, golden highlights, and volumetric lighting.
- **Aesthetic**: Premium, pristine, and magical realism.
- **Tone**: Professional, science-backed, yet warm and accessible.

### Specialized Visualization Rules
1. **Odor adsorption**: Visualization of odor must show it going **INTO** the carbon granules.
2. **No Black Clouds**: Never visualize odor as black dust or clouds; use glowing energy or subtle streams.
3. **No Labels**: Never generate text, labels, or logos on product packaging (bags/bottles) within AI images.
4. **Product Naming**: Refer to the product as **"granules"** or **"additive"**, never "powder".

---

## 🛠️ Execution Standards

### 1. Think Before Coding
- Clarify ambiguities with the USER.
- State your technical plan before execution.
- Surface tradeoffs explicitly.

### 2. Surgical Changes
- Match the existing codebase style perfectly.
- Keep diffs as small as possible.
- Do not touch unrelated code.

### 3. Verification First
- Always run validation scripts (`pnpm lint`, `pnpm check-types`, etc.) before concluding a task.
- Ensure the dev server is stable after changes.

---

## 📚 Reference Index

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](../CLAUDE.md) | Core project rules and mandates |
| [docs/AGENTS.md](AGENTS.md) | Global agent instructions |
| [docs/HYDRATION_SAFETY.md](HYDRATION_SAFETY.md) | Avoiding hydration mismatches |
| [docs/NO_FABRICATION_RULE.md](NO_FABRICATION_RULE.md) | Rules against fabrication |
