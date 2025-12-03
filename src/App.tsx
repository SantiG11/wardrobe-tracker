import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Virtual Wardrobe (MVP)
        </h1>
        <p className="text-sm text-slate-300">Your setup is working!</p>
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default App;
