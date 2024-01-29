// tracing.js
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  WebTracerProvider,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";

// The exporter is responsible for sending traces from the browser to your collector
const exporter = new OTLPTraceExporter({
  url: process.env.REACT_APP_OTEL_COLLECTOR_URL
});
// The TracerProvider is the core library for creating traces
const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "frontend-react-js",
  }),
});
// The processor sorts through data as it comes in, before it is sent to the exporter
provider.addSpanProcessor(new BatchSpanProcessor(exporter));
// A context manager allows OTel to keep the context of function calls across async functions
// ensuring you don't have disconnected traces
provider.register({
  contextManager: new ZoneContextManager(),
});

//
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        propagateTraceHeaderCorsUrls: [
          /https?:\/\/4567.+/g,
        ],
      },
    }),
  ],
});
