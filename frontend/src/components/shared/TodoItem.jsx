'use client'

import { useState } from 'react';
import { Check, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
    onToggle?.(todo.id);
  };

  const handleDelete = () => {
    onDelete?.(todo.id);
  };

  const handleEdit = () => {
    onEdit?.(todo);
  };

  const getPriorityColor = () => {
    switch(todo.priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <Card 
      className={`
        p-4 transition-all duration-300 border-l-4 relative
        ${isCompleted 
          ? 'border-l-green-500 bg-green-50/50 opacity-80' 
          : 'border-l-primary bg-white hover:bg-gray-50'
        }
        hover:shadow-md hover:scale-[1.02] group
        ${isHovered ? 'ring-2 ring-primary/20' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Индикатор приоритета */}
      {todo.priority && (
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${getPriorityColor()}`} />
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Чекбокс и текст */}
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <button
            onClick={handleToggle}
            className={`
              flex-shrink-0 w-5 h-5 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all mt-0.5
              ${isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
              }
              transform hover:scale-110
            `}
          >
            {isCompleted && <Check className="w-3 h-3" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p 
              className={`
                text-base font-medium transition-all leading-relaxed
                ${isCompleted 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-900'
                }
                break-words
              `}
            >
              {todo.text}
            </p>
            
            {/* Дополнительная информация */}
            {todo.dueDate && (
              <p className="text-xs text-muted-foreground mt-1">
                📅 {todo.dueDate}
              </p>
            )}
          </div>
        </div>

        {/* Действия */}
        <div className={`flex items-center space-x-1 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
          >
            <Edit className="h-3 w-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
  </Card>
  );
}


// 'use client'

// import { useState } from 'react';
// import { Check, Trash2, Edit } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

// export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleToggle = () => {
//     onToggle?.(todo.id);
//   };

//   const handleDelete = () => {
//     onDelete?.(todo.id);
//   };

//   const handleEdit = () => {
//     onEdit?.(todo);
//   };

//   return (
//     <Card 
//       className={`
//         p-4 transition-all duration-200 border-l-4
//         border-l-primary bg-white hover:shadow-md
//       `}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="flex items-center justify-between">
//         {/* Чекбокс и текст */}
//         <div className="flex items-center space-x-3 flex-1 min-w-0">
//           <button
//             onClick={handleToggle}
//             className={`
//               flex-shrink-0 w-5 h-5 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all
//               border-gray-300 hover:border-green-500 hover:bg-green-50
//             `}
//           >
//             {todo.completed && <Check className="w-3 h-3" />}
//           </button>
          
//           <div className="flex-1 min-w-0">
//             <p 
//               className={`
//                 text-lg font-medium transition-all
//                 ${todo.completed 
//                   ? 'text-gray-500 line-through' 
//                   : 'text-gray-900'
//                 }
//                 break-words
//               `}
//             >
//               {todo.text}
//             </p>
//           </div>
//         </div>

//         {/* Действия */}
//         <div className={`flex items-center space-x-1 ml-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
//           {/* Кнопка редактирования */}
//           <Button
//             variant="icon"
//             onClick={handleEdit}
//           >
//             <Edit className="h-3 w-3" />
//           </Button>
//           <Button
//             variant="icon"
//             onClick={handleDelete}
//           >
//             <Trash2 className="h-3 w-3" />
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }