import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className, onClick, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-white/10 rounded-lg p-4',
        hover && 'hover:shadow-lg transition-shadow duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Card with header
interface CardWithHeaderProps extends CardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardWithHeader({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}: CardWithHeaderProps) {
  return (
    <Card className={cn('space-y-4', className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          {subtitle && (
            <p className="text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </Card>
  );
}

// Card with footer
interface CardWithFooterProps extends CardProps {
  footer: React.ReactNode;
}

export function CardWithFooter({
  footer,
  children,
  className,
  ...props
}: CardWithFooterProps) {
  return (
    <Card className={cn('space-y-4', className)} {...props}>
      <div className="flex-1">{children}</div>
      <div className="border-t border-white/10 pt-4">{footer}</div>
    </Card>
  );
}

