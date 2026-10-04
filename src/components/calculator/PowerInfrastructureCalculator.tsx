"use client";

import { useMemo, useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  estimatePowerInfrastructure,
  type Environment,
} from "@/lib/led-math";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

interface PowerInfrastructureCalculatorProps {
  locale?: Locale;
}

export function PowerInfrastructureCalculator({
  locale = "en",
}: PowerInfrastructureCalculatorProps) {
  const full = getDictionary(locale);
  const dict = full.power;
  const [areaM2, setAreaM2] = useState(36);
  const [environment, setEnvironment] = useState<Environment>("indoor");

  const estimate = useMemo(
    () => estimatePowerInfrastructure(areaM2, environment),
    [areaM2, environment],
  );

  const signalNote =
    environment === "outdoor" ? dict.signalOutdoor : dict.signalIndoor;

  return (
    <GlassPanel className="p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] text-amber">
        {full.sections.power.eyebrow}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
        {dict.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        {dict.description}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label htmlFor="area-input" className="mb-2 block text-sm text-ink-soft">
              {dict.area}
            </label>
            <input
              id="area-input"
              type="number"
              min={1}
              max={2000}
              step={1}
              value={areaM2}
              onChange={(e) => setAreaM2(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
              aria-describedby="area-hint"
            />
            <p id="area-hint" className="mt-1 text-xs text-ink-muted">
              {dict.areaHint}
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm text-ink-soft">{dict.environment}</legend>
            <div className="flex gap-3">
              {(["indoor", "outdoor"] as const).map((env) => (
                <label
                  key={env}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm ${
                    environment === env
                      ? "border-amber bg-amber/10 text-amber"
                      : "border-border text-ink-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name="environment"
                    value={env}
                    checked={environment === env}
                    onChange={() => setEnvironment(env)}
                    className="sr-only"
                  />
                  {env === "indoor" ? dict.indoor : dict.outdoor}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Result label={dict.results.max} value={`${estimate.maxKw} kW`} />
          <Result label={dict.results.avg} value={`${estimate.avgKw} kW`} />
          <Result
            label={dict.results.breaker}
            value={`${estimate.breakerAmps3Phase} A`}
          />
          <Result
            label={full.configurator.metrics.area}
            value={`${estimate.areaM2} m²`}
          />
          <div className="rounded-xl border border-border bg-white p-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-wider text-ink-muted">
              {dict.results.phase}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{dict.rstNote}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-wider text-ink-muted">
              {dict.results.network}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{signalNote}</p>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <p className="text-xs uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-xl font-semibold text-amber">{value}</p>
    </div>
  );
}
