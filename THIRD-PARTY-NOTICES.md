# Third-party notices

This project builds on the open-source work below. Each component keeps its own license. "Verified" means the license was checked against the upstream package metadata or repository when this file was written; "to verify" means it still needs a manual check before you rely on it.

| Component | Used for | License | Status |
|---|---|---|---|
| [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) (v5.4.2, bundled as `src/vendor/ts-fsrs.js`) | FSRS spaced-repetition scheduling | MIT | Verified |
| [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) | Local text-to-speech model for the class narration | Apache-2.0 | Verified (model card) |
| [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) | Runs Kokoro locally (`tools/video/narrate.py`) | MIT | Verified |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | HTML-to-video composition, lint and render | Apache-2.0 | Verified (npm metadata) |
| [GSAP](https://gsap.com) | Animation in the video compositions | GSAP: free under the GSAP Standard "No Charge" License (gsap.com/standard-license); not bundled in this repo | Verified (npm metadata); read the license page before redistributing |
| [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | Icons in `video/assets/icons/` and `src/icons.js` | MIT | Verified (repository license); Microsoft trademarks are not licensed |
| [Playwright](https://playwright.dev) (`@playwright/test`) | End-to-end tests and frame capture | Apache-2.0 | Verified |
| [FFmpeg](https://ffmpeg.org) | Audio and video encoding and measuring (installed by you, not bundled) | LGPL / GPL depending on the build | Tool only, nothing is redistributed |
| Fonts | The app and videos use the system font stack (Segoe UI, Roboto, Helvetica, Arial). No font files are bundled | n/a | Nothing to license |

## Microsoft names and content

Microsoft, Copilot Studio, Power Platform, Power Automate, Dataverse, Azure, Teams and other product names are trademarks of Microsoft Corporation. "Contoso" is Microsoft's fictional company name and is used in examples only. Lessons and questions are written from public Microsoft documentation, with the source URL stored next to each fact. This project is not affiliated with or endorsed by Microsoft.

## Your contribution

If you add a dependency, asset, image, voice or font, add a row here with its license and where you checked it.
