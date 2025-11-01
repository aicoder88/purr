// [build] library: 'shadcn'
import { Badge, BadgeProps } from "../components/ui/badge";

const meta = {
  title: "ui/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

export const Base = {
  render: (args: BadgeProps) => <Badge {...args}>Badge</Badge>,
  args: {},
};
export const Secondary = {
  render: (args: BadgeProps) => <Badge {...args}>Secondary</Badge>,
  args: {
    variant: "secondary",
  },
};
export const Outline = {
  render: (args: BadgeProps) => <Badge {...args}>Outline</Badge>,
  args: {
    variant: "outline",
  },
};
export const Destructive = {
  render: (args: BadgeProps) => <Badge {...args}>Destructive</Badge>,
  args: {
    variant: "destructive",
  },
};
