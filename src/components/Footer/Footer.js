import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-background pt-10 pb-5">
      <div className="max-w-[1440px] mx-auto px-4 xl:px-20 md:px-10 sm:px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / About */}
          <div>
            {/* <h2 className="text-2xl font-bold text-background">Al-Shafi</h2> */}
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>
            <p className="text-sm mt-3 leading-6">
              Al-Shafi is your trusted online store for premium products at
              affordable prices. Fast delivery, secure payment & 24/7 support.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-background duration-200" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-background duration-200" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-background duration-200" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-background duration-200" />
            </div>
          </div>

          {/* SHOP LINKS */}
          <div>
            <h3 className="text-background font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-background cursor-pointer">
                New Arrivals
              </li>
              <li className="hover:text-background cursor-pointer">
                Best Sellers
              </li>
              <li className="hover:text-background cursor-pointer">
                Men's Collection
              </li>
              <li className="hover:text-background cursor-pointer">
                Women's Collection
              </li>
              <li className="hover:text-background cursor-pointer">Sale</li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="text-background font-semibold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-background cursor-pointer">FAQs</li>
              <li className="hover:text-background cursor-pointer">
                Shipping Policy
              </li>
              <li className="hover:text-background cursor-pointer">
                Return Policy
              </li>
              <li className="hover:text-background cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-background cursor-pointer">
                Track Your Order
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-background font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@alshafi.com</span>
              </li>

              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+880 1234-567890</span>
              </li>

              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Gulshan, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 mt-10 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Al-Shafi — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
