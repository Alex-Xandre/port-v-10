import { Mail } from "lucide-react";

const Contact = () => (
  <div className="flex flex-col gap-2 text-text-primary/60">
    <p className="text-xs leading-relaxed">
      Got a project, an idea, or just want to chat? Reach me at:
    </p>
    <a
      href="mailto:xndrmcua22@gmail.com"
      className="flex items-center gap-2 text-text-primary/80 transition-colors hover:text-text-primary"
    >
      <Mail size={14} />
      <span className="font-mono text-xs">xndrmcua22@gmail.com</span>
    </a>
  </div>
);

export default Contact;
