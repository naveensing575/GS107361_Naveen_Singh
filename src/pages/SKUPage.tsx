import SKUForm from "../components/SKUForm";
import SKUList from "../components/SKUList";

export default function SKUPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">SKUs</h2>
      <SKUForm />
      <SKUList />
    </div>
  );
}
