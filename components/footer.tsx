import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-lg">N</span>
              </div>
              <span className="font-bold">NutriCart</span>
            </div>
            <p className="text-sm text-white/70">Premium nutrition for a healthier you</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition">
                  Proteins
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Superfoods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Supplements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Organic
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white/70">© 2025 NutriCart. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm text-white/70">
            <span>Done by Varsha</span>
            
          </div>
        </div>
      </div>
    </footer>
  )
}
