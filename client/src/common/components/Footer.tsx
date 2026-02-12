import { LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Changelog", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  };

  const socials = [
    { icon: LuTwitter, href: "#", label: "Twitter" },
    { icon: LuGithub, href: "#", label: "GitHub" },
    { icon: LuLinkedin, href: "#", label: "LinkedIn" },
    { icon: MdOutlineMailOutline, href: "#", label: "Email" },
  ];

  return (
    <footer className="border-border bg-card border-t">
      <div className="px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="animate-fade-in col-span-2 md:col-span-1">
            <h3 className="text-foreground text-lg font-semibold">FashApp</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Building beautiful digital experiences with simplicity and
              purpose.
            </p>
          </div>

          {/* Product */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h4 className="text-foreground text-sm font-medium">Product</h4>
            <ul className="mt-3 space-y-2">
              {links.product.map((link, index) => (
                <li
                  key={link.name}
                  style={{ animationDelay: `${150 + index * 50}ms` }}
                  className="animate-fade-in"
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary inline-block text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h4 className="text-foreground text-sm font-medium">Company</h4>
            <ul className="mt-3 space-y-2">
              {links.company.map((link, index) => (
                <li
                  key={link.name}
                  style={{ animationDelay: `${250 + index * 50}ms` }}
                  className="animate-fade-in"
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary inline-block text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h4 className="text-foreground text-sm font-medium">Legal</h4>
            <ul className="mt-3 space-y-2">
              {links.legal.map((link, index) => (
                <li
                  key={link.name}
                  style={{ animationDelay: `${350 + index * 50}ms` }}
                  className="animate-fade-in"
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary inline-block text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-border animate-fade-in mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{ animationDelay: "400ms" }}
        >
          <p className="text-muted-foreground text-sm">
            © {currentYear} FashApp. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                style={{ animationDelay: `${450 + index * 75}ms` }}
              >
                <social.icon
                  className="animate-fade-in h-5 w-5"
                  style={{ animationDelay: `${450 + index * 75}ms` }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
