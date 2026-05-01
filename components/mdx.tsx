import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  AlertCircle,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  ArrowRightFromLine,
  ArrowRightToLine,
  BarChart3,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  Code,
  FlaskConical,
  Ghost,
  Hand,
  Inbox,
  Info,
  Key,
  Lock,
  LockOpen,
  LucideIcon,
  Pen,
  Plug,
  Rocket,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Slack,
  SlidersHorizontal,
  Sparkles,
  Star,
  Terminal,
  TriangleAlert,
  User,
  Webhook,
  Wrench,
  X,
} from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

const iconMap = {
  'arrow-right': ArrowRight,
  'arrow-right-from-bracket': ArrowRightFromLine,
  'arrow-right-to-bracket': ArrowRightToLine,
  bell: Bell,
  check: Check,
  'chart-line': BarChart3,
  code: Code,
  flask: FlaskConical,
  ghost: Ghost,
  hand: Hand,
  inbox: Inbox,
  key: Key,
  lock: Lock,
  'lock-open': LockOpen,
  'magnifying-glass': Search,
  pen: Pen,
  plug: Plug,
  robot: Bot,
  rocket: Rocket,
  'scale-balanced': Scale,
  shield: Shield,
  'shield-check': ShieldCheck,
  slack: Slack,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  star: Star,
  terminal: Terminal,
  'triangle-exclamation': TriangleAlert,
  user: User,
  webhook: Webhook,
  wrench: Wrench,
  xmark: X,
};

type CardProps = {
  title: string;
  icon?: keyof typeof iconMap;
  href?: string;
  children: ReactNode;
};

function getIcon(icon?: keyof typeof iconMap): LucideIcon | undefined {
  return icon ? iconMap[icon] : undefined;
}

function Card({ title, icon, href, children }: CardProps) {
  const Icon = getIcon(icon);
  const content = (
    <div className="not-prose h-full rounded-lg border bg-fd-card p-4 text-fd-card-foreground transition-colors hover:bg-fd-accent/40">
      <div className="mb-2 flex items-center gap-2">
        {Icon ? <Icon className="size-4 text-[var(--bram-primary)]" /> : null}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="text-sm leading-6 text-fd-muted-foreground">{children}</div>
    </div>
  );

  if (!href) return content;

  return (
    <a className="block no-underline" href={href}>
      {content}
    </a>
  );
}

function CardGroup({
  cols = 2,
  children,
}: {
  cols?: 2 | 3 | 4;
  children: ReactNode;
}) {
  const columns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[cols];

  return <div className={`my-6 grid gap-4 ${columns}`}>{children}</div>;
}

function Steps({ children }: { children: ReactNode }) {
  return <ol className="my-6 space-y-4 [counter-reset:step]">{children}</ol>;
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="relative list-none border-l pl-6 [counter-increment:step]">
      <span className="absolute -left-3 flex size-6 items-center justify-center rounded-full border bg-fd-background text-xs font-semibold text-fd-muted-foreground before:content-[counter(step)]" />
      <h3 className="mt-0 text-base font-semibold">{title}</h3>
      <div className="text-fd-muted-foreground">{children}</div>
    </li>
  );
}

function Tabs({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 space-y-3">{children}</div>;
}

function Tab({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border bg-fd-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-fd-card-foreground">{title}</h3>
      <div className="prose prose-fd max-w-none text-fd-muted-foreground">{children}</div>
    </section>
  );
}

function CodeGroup({ children }: { children: ReactNode }) {
  return <div className="my-6 space-y-4">{children}</div>;
}

function Accordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="not-prose my-4 rounded-lg border bg-fd-card p-4" open>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-fd-card-foreground">
        <span>{title}</span>
        <ChevronDown className="size-4 text-fd-muted-foreground" />
      </summary>
      <div className="prose prose-fd mt-4 max-w-none text-fd-muted-foreground">{children}</div>
    </details>
  );
}

function Callout({
  type,
  children,
}: {
  type: 'note' | 'tip' | 'warning';
  children: ReactNode;
}) {
  const Icon = type === 'tip' ? CheckCircle2 : type === 'warning' ? AlertCircle : Info;
  const color =
    type === 'tip'
      ? 'var(--bram-success)'
      : type === 'warning'
        ? 'var(--bram-warning)'
        : 'var(--bram-info)';

  return (
    <div className="not-prose my-6 flex gap-3 rounded-lg border bg-fd-card p-4 text-sm leading-6">
      <Icon className="mt-0.5 size-4 shrink-0" style={{ color }} />
      <div>{children}</div>
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Card,
    CardGroup,
    CodeGroup,
    Steps,
    Step,
    Tab,
    Tabs,
    Note: (props: ComponentProps<typeof Callout>) => <Callout {...props} type="note" />,
    Tip: (props: ComponentProps<typeof Callout>) => <Callout {...props} type="tip" />,
    Warning: (props: ComponentProps<typeof Callout>) => <Callout {...props} type="warning" />,
    ArrowDownToLine,
    ArrowLeftRight,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
