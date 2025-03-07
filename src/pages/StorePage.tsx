import StoreForm from "../components/StoreForm";
import StoreList from "../components/StoreList";

export default function StorePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
      <StoreForm />
      <StoreList />
    </div>
  );
}
