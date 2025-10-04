'use client'

import { useState } from 'react';
import { Check, Trash2, Edit, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    onToggle?.(todo.id);
  };

  const handleDelete = () => {
    onDelete?.(todo.id);
  };

  const handleEdit = () => {
    onEdit?.(todo);
  };

  return (
    <Card 
      className={`
        p-4 transition-all duration-200 border-l-4
        border-l-primary bg-white hover:shadow-md
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        {/* Чекбокс и текст */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <button
            onClick={handleToggle}
            className={`
              flex-shrink-0 w-5 h-5 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all
              border-gray-300 hover:border-green-500 hover:bg-green-50
            `}
          >
            {todo.completed && <Check className="w-3 h-3" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p 
              className={`
                text-lg font-medium transition-all
                ${todo.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-900'
                }
                break-words
              `}
            >
              {todo.text}
            </p>
          </div>
        </div>

        {/* Действия */}
        <div className={`flex items-center space-x-1 ml-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          {/* Кнопка редактирования */}
          <Button
            variant="icon"
            onClick={handleEdit}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="icon"
            onClick={handleDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}