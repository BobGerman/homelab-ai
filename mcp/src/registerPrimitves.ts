import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import registerEchoTool from "./tools/echo/echo.ts";
import registerElicitEchoTool from "./tools/echo/elicitEcho.ts";
import registerCodeCampSessionsTool from "./tools/codeCamp/sessions.ts";
import registerCodeCampSpeakersTool from "./tools/codeCamp/speakers.ts";
import registerCodeCampGeneralInfoTool from "./tools/codeCamp/generalInfo.ts";
import registerWeatherConditionsTool from "./tools/weather/conditions.ts";
import registerWeatherAlertsTool from "./tools/weather/alertsTool.ts";
import registerBackgroundInfoResource from "./resources/backgroundInfo.ts";

/**
 * Registers all MCP tools on the server.
 * Called once per session from getServer() in src/index.ts.
 */
export function registerPrimitives(server: McpServer): void {

  // Tools
  // registerEchoTool(server);
  // registerElicitEchoTool(server);
  // registerCodeCampSessionsTool(server);
  // registerCodeCampSpeakersTool(server);
  // registerCodeCampGeneralInfoTool(server);
  registerWeatherConditionsTool(server);
  registerWeatherAlertsTool(server);

  // Resources
  registerBackgroundInfoResource(server);
}
