import { Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Organic Protein Powder",
    category: "proteins",
    price: "$49.99",
    stock: 142,
    rating: 4.8,
    sales: 320,
  },
  {
    id: 2,
    name: "Premium Superfood Blend",
    category: "superfoods",
    price: "$39.99",
    stock: 87,
    rating: 4.9,
    sales: 215,
  },
  {
    id: 3,
    name: "Organic Nuts & Seeds Mix",
    category: "organic",
    price: "$29.99",
    stock: 156,
    rating: 4.7,
    sales: 428,
  },
  {
    id: 4,
    name: "Whole Grain Cereal",
    category: "organic",
    price: "$19.99",
    stock: 203,
    rating: 4.6,
    sales: 267,
  },
]

export default function ProductsManagement() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Sales</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{product.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 100 ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-600"}`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{product.rating}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.sales} sold</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
