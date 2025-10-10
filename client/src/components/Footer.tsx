import { Link } from "wouter";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Heart className="h-5 w-5" />
              </div>
              <span className="text-xl font-serif font-bold">Eboni Dating</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Celebrating Black love and building meaningful connections in our community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/browse"><span className="hover:text-primary cursor-pointer">Browse Profiles</span></Link></li>
              <li><Link href="/events"><span className="hover:text-primary cursor-pointer">Events</span></Link></li>
              <li><Link href="/membership"><span className="hover:text-primary cursor-pointer">Membership</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary cursor-pointer">About Us</span></Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/help"><span className="hover:text-primary cursor-pointer">Help Center</span></Link></li>
              <li><Link href="/safety"><span className="hover:text-primary cursor-pointer">Safety Tips</span></Link></li>
              <li><Link href="/privacy"><span className="hover:text-primary cursor-pointer">Privacy Policy</span></Link></li>
              <li><Link href="/terms"><span className="hover:text-primary cursor-pointer">Terms of Service</span></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@ebonidating.com" className="hover:text-primary">
                  info@ebonidating.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Los Angeles, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Eboni Dating. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
