import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/list-property")({
  head: () => ({
    meta: [
      { title: "List Your Property — Saaranya" },
      { name: "description", content: "List your residential, commercial or plot property with Saaranya. Verified listings, transparent pricing." },
      { property: "og:title", content: "List Your Property — Saaranya" },
    ],
  }),
  component: ListPropertyPage,
});

const steps = ["Type", "Location", "Details", "Amenities", "Media", "Contact"];

function ListPropertyPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    type: "Residential", status: "Sale",
    city: "", area: "", address: "",
    bhk: "2BHK", builtUp: "", floor: "", age: "", furnishing: "Semi-Furnished", price: "",
    amenities: [] as string[],
    photos: "", video: "",
    name: "", phone: "", email: "",
  });
  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData((d) => ({ ...d, [k]: v }));

  const allAmen = ["Lift", "Parking", "Power Backup", "24/7 Security", "CCTV", "Gym", "Swimming Pool", "Garden", "Club House", "Kids Play Area"];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => setDone(true);

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );

  const input = "w-full px-4 py-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:border-foreground/50";

  const Toggle = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-4 py-2 text-sm rounded-full border transition-colors ${value === o ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}>
          {o}
        </button>
      ))}
    </div>
  );

  if (done) {
    return (
      <div className="container-page pt-32 pb-32 text-center">
        <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center mb-6"><Check className="h-6 w-6" /></div>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Thank you.</h1>
        <p className="text-muted-foreground max-w-md mx-auto">We've received your listing. A member of our team will call you within one working day to verify the details and schedule a visit.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="container-page pt-32 pb-10">
        <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 cinematic-child">List With Us</div>
        <h1 className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight cinematic-reveal">Tell us about your property.</h1>
      </section>

      <section className="container-page pb-24 perspective-container">
        {/* Step indicator */}
        <div className="flex items-center mb-10 overflow-x-auto cinematic-child">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center shrink-0">
              <div className={`flex items-center gap-3 ${i === step ? "" : "opacity-50"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs border ${i < step ? "bg-primary text-primary-foreground border-primary" : i === step ? "border-foreground" : "border-border"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <div className="text-sm whitespace-nowrap">{s}</div>
              </div>
              {i < steps.length - 1 && <div className="w-8 md:w-16 h-px bg-border mx-3" />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-md p-8 md:p-10 space-y-6 card-popup-3d">
          {step === 0 && (
            <>
              <Field label="Property type"><Toggle options={["Residential", "Commercial", "Plot", "Industrial"]} value={data.type} onChange={(v) => set("type", v)} /></Field>
              <Field label="Listing as"><Toggle options={["Sale", "Rent"]} value={data.status} onChange={(v) => set("status", v)} /></Field>
            </>
          )}
          {step === 1 && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="City"><input className={input} value={data.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Mumbai" /></Field>
                <Field label="Area / Neighbourhood"><input className={input} value={data.area} onChange={(e) => set("area", e.target.value)} placeholder="e.g. Bandra West" /></Field>
              </div>
              <Field label="Full address"><textarea rows={3} className={input} value={data.address} onChange={(e) => set("address", e.target.value)} /></Field>
            </>
          )}
          {step === 2 && (
            <>
              <Field label="BHK"><Toggle options={["1BHK", "2BHK", "3BHK", "4BHK", "4BHK+"]} value={data.bhk} onChange={(v) => set("bhk", v)} /></Field>
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="Built-up area (sqft)"><input className={input} value={data.builtUp} onChange={(e) => set("builtUp", e.target.value)} /></Field>
                <Field label="Floor"><input className={input} value={data.floor} onChange={(e) => set("floor", e.target.value)} placeholder="e.g. 12 / 24" /></Field>
                <Field label="Property age"><input className={input} value={data.age} onChange={(e) => set("age", e.target.value)} placeholder="e.g. 3 years" /></Field>
              </div>
              <Field label="Furnishing"><Toggle options={["Furnished", "Semi-Furnished", "Unfurnished"]} value={data.furnishing} onChange={(v) => set("furnishing", v)} /></Field>
              <Field label="Expected price (₹)"><input className={input} value={data.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. 1.95 Cr" /></Field>
            </>
          )}
          {step === 3 && (
            <Field label="Available amenities">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allAmen.map((a) => {
                  const on = data.amenities.includes(a);
                  return (
                    <button type="button" key={a}
                      onClick={() => set("amenities", on ? data.amenities.filter((x) => x !== a) : [...data.amenities, a])}
                      className={`flex items-center gap-3 px-4 py-3 text-sm border rounded-md transition-colors ${on ? "border-foreground bg-secondary" : "border-border hover:border-foreground/50"}`}>
                      <span className={`h-4 w-4 rounded-sm border flex items-center justify-center ${on ? "bg-primary border-primary" : "border-border"}`}>
                        {on && <Check className="h-3 w-3 text-primary-foreground" />}
                      </span>
                      {a}
                    </button>
                  );
                })}
              </div>
            </Field>
          )}
          {step === 4 && (
            <>
              <Field label="Upload photos">
                <label className="block border-2 border-dashed border-border rounded-md p-10 text-center text-sm text-muted-foreground cursor-pointer hover:border-foreground/50">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => set("photos", `${e.target.files?.length ?? 0} photo(s) selected`)} />
                  Click to upload photos · JPG / PNG · up to 10 files
                  {data.photos && <div className="mt-2 text-foreground">{data.photos}</div>}
                </label>
              </Field>
              <Field label="Walkthrough video link (optional)"><input className={input} value={data.video} onChange={(e) => set("video", e.target.value)} placeholder="YouTube or Vimeo URL" /></Field>
            </>
          )}
          {step === 5 && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Your name"><input required className={input} value={data.name} onChange={(e) => set("name", e.target.value)} /></Field>
                <Field label="Phone"><input required className={input} value={data.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
              </div>
              <Field label="Email"><input type="email" required className={input} value={data.email} onChange={(e) => set("email", e.target.value)} /></Field>
            </>
          )}

          <div className="flex justify-between pt-4 border-t border-border">
            <Button variant="ghost" onClick={back} disabled={step === 0}><ChevronLeft className="h-4 w-4" /> Back</Button>
            {step < steps.length - 1
              ? <Button onClick={next}>Next <ChevronRight className="h-4 w-4" /></Button>
              : <Button onClick={submit}>Submit Listing</Button>}
          </div>
        </div>
      </section>
    </div>
  );
}
