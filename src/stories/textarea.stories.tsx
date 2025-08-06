import { ComponentProps } from 'react';
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

type TextareaProps = ComponentProps<typeof Textarea>;

const meta = {
  title: "ui/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

export const Default = {
  render: (args: TextareaProps) => <Textarea {...args} />,
  args: {
    placeholder: "Type your message here.",
  },
};

export const Disabled = {
  render: (args: TextareaProps) => <Textarea {...args} />,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithLabel = {
  render: (args: TextareaProps) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
  args: { ...Default.args },
};

export const WithText = {
  render: (args: TextareaProps) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea {...args} id="message-2" />
      <p className="text-sm text-slate-500">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
  args: { ...Default.args },
};

export const WithButton = {
  render: (args: TextareaProps) => (
    <div className="grid w-full gap-2">
      <Textarea {...args} />
      <Button>Send message</Button>
    </div>
  ),
  args: { ...Default.args },
};
