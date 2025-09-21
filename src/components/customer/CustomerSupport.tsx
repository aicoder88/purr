import { useState, useEffect } from 'react';
import { MessageCircle, Plus, Eye, Clock, CheckCircle, X, FileText, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'order-issue' | 'subscription' | 'product-question' | 'billing' | 'technical' | 'other';
  created: string;
  updated: string;
  messages: SupportMessage[];
}

interface SupportMessage {
  id: string;
  content: string;
  author: 'customer' | 'support';
  timestamp: string;
  attachments?: string[];
}

interface CustomerSupportProps {
  customerId: string;
}

export function CustomerSupport({ customerId }: CustomerSupportProps) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupportTickets();
  }, [customerId]);

  const fetchSupportTickets = async () => {
    try {
      setLoading(true);

      // Mock data - replace with actual API calls
      const mockTickets: SupportTicket[] = [
        {
          id: 'ticket_001',
          subject: 'Issue with my recent order',
          description: 'My order PUR-2024-001 was supposed to arrive yesterday but I haven\'t received it yet.',
          status: 'in-progress',
          priority: 'medium',
          category: 'order-issue',
          created: '2024-01-20T10:30:00Z',
          updated: '2024-01-21T14:15:00Z',
          messages: [
            {
              id: 'msg_001',
              content: 'My order PUR-2024-001 was supposed to arrive yesterday but I haven\'t received it yet. Can you please check the tracking?',
              author: 'customer',
              timestamp: '2024-01-20T10:30:00Z'
            },
            {
              id: 'msg_002',
              content: 'Hi Sarah! I\'ve checked your order and it appears to be delayed in transit. The tracking shows it\'s currently at the local distribution center and should be delivered today. I\'ll keep monitoring and update you if there are any changes.',
              author: 'support',
              timestamp: '2024-01-21T14:15:00Z'
            }
          ]
        },
        {
          id: 'ticket_002',
          subject: 'Question about subscription frequency',
          description: 'I want to change my subscription from monthly to bi-weekly delivery.',
          status: 'resolved',
          priority: 'low',
          category: 'subscription',
          created: '2024-01-18T16:45:00Z',
          updated: '2024-01-19T09:20:00Z',
          messages: [
            {
              id: 'msg_003',
              content: 'I want to change my subscription from monthly to bi-weekly delivery. How can I do this?',
              author: 'customer',
              timestamp: '2024-01-18T16:45:00Z'
            },
            {
              id: 'msg_004',
              content: 'You can easily change your subscription frequency in your customer portal under the Subscriptions tab. I\'ve also updated it for you - your next delivery will be in 2 weeks instead of next month.',
              author: 'support',
              timestamp: '2024-01-19T09:20:00Z'
            }
          ]
        }
      ];

      setTickets(mockTickets);
    } catch (error) {
      console.error('Failed to fetch support tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewTicket = async (ticketData: Partial<SupportTicket>) => {
    try {
      // Mock API call - replace with actual support ticket creation
      const newTicket: SupportTicket = {
        id: `ticket_${Date.now()}`,
        subject: ticketData.subject || '',
        description: ticketData.description || '',
        status: 'open',
        priority: ticketData.priority || 'medium',
        category: ticketData.category || 'other',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        messages: [
          {
            id: `msg_${Date.now()}`,
            content: ticketData.description || '',
            author: 'customer',
            timestamp: new Date().toISOString()
          }
        ]
      };

      setTickets(prev => [newTicket, ...prev]);
      setShowNewTicketForm(false);

      // Track ticket creation for analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'support_ticket_created', {
          event_category: 'support',
          event_label: newTicket.category
        });
      }
    } catch (error) {
      console.error('Failed to create support ticket:', error);
    }
  };

  const addMessage = async (ticketId: string, content: string) => {
    try {
      const newMessage: SupportMessage = {
        id: `msg_${Date.now()}`,
        content,
        author: 'customer',
        timestamp: new Date().toISOString()
      };

      setTickets(prev => prev.map(ticket =>
        ticket.id === ticketId
          ? {
              ...ticket,
              messages: [...ticket.messages, newMessage],
              updated: new Date().toISOString()
            }
          : ticket
      ));

      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(prev => prev ? {
          ...prev,
          messages: [...prev.messages, newMessage],
          updated: new Date().toISOString()
        } : null);
      }
    } catch (error) {
      console.error('Failed to add message:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
      'in-progress': 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300',
      resolved: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
      closed: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
      medium: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
      high: 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300',
      urgent: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTicket) {
    return <TicketView ticket={selectedTicket} onBack={() => setSelectedTicket(null)} onAddMessage={addMessage} />;
  }

  if (showNewTicketForm) {
    return <NewTicketForm onSubmit={createNewTicket} onCancel={() => setShowNewTicketForm(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Support Tickets</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Get help with your orders, subscriptions, and more</p>
          </div>
          <button
            onClick={() => setShowNewTicketForm(true)}
            className="px-4 py-2 bg-blue-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Your Tickets</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-1">{ticket.subject}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{ticket.description}</p>
                  </div>
                  <Eye className="w-5 h-5 text-gray-400 dark:text-gray-500 ml-4 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={cn('inline-flex px-2 py-1 text-xs font-medium rounded-full', getStatusColor(ticket.status))}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className={cn('inline-flex px-2 py-1 text-xs font-medium rounded-full', getPriorityColor(ticket.priority))}>
                      {ticket.priority}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {ticket.category.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {formatDate(ticket.updated)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No support tickets yet</p>
              <button
                onClick={() => setShowNewTicketForm(true)}
                className="px-6 py-2 bg-blue-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Your First Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// New Ticket Form Component
function NewTicketForm({ onSubmit, onCancel }: {
  onSubmit: (data: Partial<SupportTicket>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'other' as SupportTicket['category'],
    priority: 'medium' as SupportTicket['priority']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject.trim() && formData.description.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Create New Support Ticket</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of your issue"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as SupportTicket['category'] }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
            >
              <option value="order-issue">Order Issue</option>
              <option value="subscription">Subscription</option>
              <option value="product-question">Product Question</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as SupportTicket['priority'] }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Please provide as much detail as possible about your issue..."
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white dark:text-gray-100 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

// Ticket View Component
function TicketView({ ticket, onBack, onAddMessage }: {
  ticket: SupportTicket;
  onBack: () => void;
  onAddMessage: (ticketId: string, content: string) => void;
}) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onAddMessage(ticket.id, newMessage);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
      'in-progress': 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300',
      resolved: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
      closed: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <button
            onClick={onBack}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-2"
          >
            ← Back to Tickets
          </button>
          <span className={cn('inline-flex px-3 py-1 text-sm font-medium rounded-full', getStatusColor(ticket.status))}>
            {ticket.status.replace('-', ' ')}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{ticket.subject}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Ticket #{ticket.id}</span>
          <span>•</span>
          <span>Created {formatDate(ticket.created)}</span>
          <span>•</span>
          <span className="capitalize">{ticket.category.replace('-', ' ')}</span>
          <span>•</span>
          <span className="capitalize">{ticket.priority} priority</span>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Conversation</h3>
        </div>

        <div className="p-6 space-y-6">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-4',
                message.author === 'customer' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div className={cn(
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium',
                message.author === 'customer'
                  ? 'bg-blue-600 dark:bg-blue-500'
                  : 'bg-green-600 dark:bg-green-500'
              )}>
                {message.author === 'customer' ? 'You' : 'CS'}
              </div>

              <div className={cn(
                'flex-1 max-w-md',
                message.author === 'customer' ? 'text-right' : 'text-left'
              )}>
                <div className={cn(
                  'rounded-lg p-4',
                  message.author === 'customer'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50'
                )}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDate(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        {ticket.status !== 'closed' && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <form onSubmit={handleSubmitMessage}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white dark:text-gray-100 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}