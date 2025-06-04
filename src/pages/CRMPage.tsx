import React, { useState } from 'react';
import { Search, Plus, Star, Mail, Phone, Clock, User, Building } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { cn } from '../lib/utils';
import { OpportunityDetailPopup } from '../components/OpportunityDetailPopup';

type Stage = 'new' | 'qualified' | 'proposition' | 'won';

interface Opportunity {
  id: number;
  title: string;
  amount: number;
  company: string;
  tags: string[];
  rating: number;
  contactType: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
}

interface OpportunitiesByStage {
  [key: string]: Opportunity[];
}

export const CRMPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Sales Team');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [opportunities, setOpportunities] = useState<OpportunitiesByStage>({
    new: [
      {
        id: 1,
        title: 'Office Design Project',
        amount: 24000.00,
        company: 'Deco Addict',
        tags: ['Design'],
        rating: 2,
        contactType: 'email',
        assignedTo: {
          name: 'John Smith',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 2,
        title: 'Quote for 150 carpets',
        amount: 40000.00,
        company: 'Ready Mat',
        tags: ['Product'],
        rating: 1,
        contactType: 'clock',
        assignedTo: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      }
    ],
    qualified: [
      {
        id: 3,
        title: 'Interest in your products',
        amount: 2000.00,
        company: 'The Jackson Group',
        tags: ['Product', 'Information'],
        rating: 2,
        contactType: 'document',
        assignedTo: {
          name: 'Michael Brown',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 4,
        title: 'DeltaPC: 10 Computer Desks',
        amount: 35000.00,
        company: 'Ready Mat',
        tags: ['Information', 'Training'],
        rating: 1,
        contactType: 'phone',
        assignedTo: {
          name: 'Emily Davis',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 5,
        title: 'Need 20 Desks',
        amount: 60000.00,
        company: 'Ready Mat',
        tags: ['Product', 'Consulting'],
        rating: 0,
        contactType: 'email',
        assignedTo: {
          name: 'Alex Wilson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      }
    ],
    proposition: [
      {
        id: 6,
        title: 'Open Space Design',
        amount: 11000.00,
        company: 'Deco Addict',
        tags: ['Design', 'Information'],
        rating: 2,
        contactType: 'email',
        assignedTo: {
          name: 'Lisa Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 7,
        title: 'Office Design and Architecture',
        amount: 9000.00,
        company: 'Ready Mat',
        tags: ['Design', 'Consulting'],
        rating: 2,
        contactType: 'phone',
        assignedTo: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 8,
        title: '5 VP Chairs',
        amount: 5600.00,
        company: 'Azure Interior, Colleen Diaz',
        tags: ['Product'],
        rating: 1,
        contactType: 'email',
        assignedTo: {
          name: 'Rachel Green',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 9,
        title: 'Customizable Desk',
        amount: 15000.00,
        company: 'Azure Interior',
        tags: ['Product'],
        rating: 1,
        contactType: 'phone',
        assignedTo: {
          name: 'Tom Wilson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      }
    ],
    won: [
      {
        id: 10,
        title: 'Distributor Contract',
        amount: 19800.00,
        company: 'Gemini Furniture',
        tags: ['Information', 'Other'],
        rating: 2,
        contactType: 'phone',
        assignedTo: {
          name: 'Kate Brown',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      },
      {
        id: 11,
        title: 'Access to Online Catalog',
        amount: 2000.00,
        company: 'Lumber Inc',
        tags: ['Services'],
        rating: 1,
        contactType: 'email',
        assignedTo: {
          name: 'James Lee',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      }
    ]
  });

  const getStageTotal = (stage: Stage) => {
    return opportunities[stage].reduce((sum, opp) => sum + opp.amount, 0);
  };

  const getStageProgress = (stage: Stage) => {
    const total = Object.values(opportunities).flat().reduce((sum, opp) => sum + opp.amount, 0);
    const stageTotal = getStageTotal(stage);
    return (stageTotal / total) * 100;
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const newOpportunities = { ...opportunities };

    const [movedOpportunity] = newOpportunities[source.droppableId].splice(source.index, 1);

    newOpportunities[destination.droppableId].splice(destination.index, 0, movedOpportunity);

    setOpportunities(newOpportunities);
  };

  const OpportunityCard: React.FC<{ opportunity: Opportunity; index: number }> = ({ opportunity, index }) => {
    return (
      <Draggable draggableId={opportunity.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(
              "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3 cursor-pointer",
              snapshot.isDragging && "shadow-lg"
            )}
            onClick={() => setSelectedOpportunity(opportunity)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {opportunity.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ${opportunity.amount.toLocaleString()}
                </p>
              </div>
              <img
                src={opportunity.assignedTo.avatar}
                alt={opportunity.assignedTo.name}
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex items-center mb-2">
              <Building className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {opportunity.company}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {opportunity.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < opportunity.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    )}
                  />
                ))}
              </div>
              <div>
                {opportunity.contactType === 'email' && <Mail className="h-4 w-4 text-gray-400" />}
                {opportunity.contactType === 'phone' && <Phone className="h-4 w-4 text-gray-400" />}
                {opportunity.contactType === 'clock' && <Clock className="h-4 w-4 text-gray-400" />}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            New
          </Button>
          <div className="relative">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
            >
              <option>Sales Team</option>
              <option>Pre-Sales</option>
            </select>
          </div>
        </div>
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">New</h2>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ${getStageTotal('new').toLocaleString()}
              </span>
            </div>
            <div className="mb-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${getStageProgress('new')}%` }}
              />
            </div>
            <Droppable droppableId="new">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {opportunities.new.map((opportunity, index) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Qualified</h2>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ${getStageTotal('qualified').toLocaleString()}
              </span>
            </div>
            <div className="mb-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${getStageProgress('qualified')}%` }}
              />
            </div>
            <Droppable droppableId="qualified">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {opportunities.qualified.map((opportunity, index) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Proposition</h2>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ${getStageTotal('proposition').toLocaleString()}
              </span>
            </div>
            <div className="mb-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${getStageProgress('proposition')}%` }}
              />
            </div>
            <Droppable droppableId="proposition">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {opportunities.proposition.map((opportunity, index) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Won</h2>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ${getStageTotal('won').toLocaleString()}
              </span>
            </div>
            <div className="mb-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${getStageProgress('won')}%` }}
              />
            </div>
            <Droppable droppableId="won">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {opportunities.won.map((opportunity, index) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      <OpportunityDetailPopup
        isOpen={selectedOpportunity !== null}
        onClose={() => setSelectedOpportunity(null)}
        opportunity={selectedOpportunity}
      />
    </div>
  );
};