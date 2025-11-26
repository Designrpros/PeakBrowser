'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { Plus, Trash2 } from 'lucide-react';

// --- TYPES ---
interface Task {
    id: string;
    content: string;
}

interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

// --- STYLED COMPONENTS ---

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--text-background-color);
    color: var(--peak-primary);
    overflow: hidden;
`;

const Header = styled.div`
    padding: 24px 32px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid transparent; 
`;

const HeaderTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 4px 0;
    background: linear-gradient(90deg, #6688AA, #88B0D6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
`;

const HeaderSubtitle = styled.p`
    font-size: 13px;
    color: var(--peak-secondary);
    margin: 0;
    font-weight: 500;
`;

const TaskCounter = styled.div`
    font-size: 13px;
    color: var(--peak-secondary);
    font-weight: 600;
    background: var(--control-background-color);
    padding: 4px 12px;
    border-radius: 12px;
`;

const ScrollArea = styled.div`
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 32px 24px 32px;
    display: flex;
    gap: 16px;
    align-items: stretch; /* FIX: Columns fill height */
    
    &::-webkit-scrollbar { height: 8px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
`;

const ColumnContainer = styled.div<{ $isDragOver: boolean }>`
    min-width: 300px;
    width: 300px;
    height: 100%; 
    background-color: ${props => props.$isDragOver ? 'rgba(102, 136, 170, 0.05)' : 'transparent'};
    border: 1px solid ${props => props.$isDragOver ? 'var(--peak-accent)' : 'var(--border-color)'};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
        border-color: var(--peak-accent);
    }
`;

const ColumnHeader = styled.div`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    color: var(--peak-primary);
    border-bottom: 1px solid var(--border-color);
    flex-shrink: 0;
`;

const Badge = styled.span`
    font-size: 11px;
    background-color: var(--control-background-color);
    color: var(--peak-secondary);
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: 600;
`;

const TaskList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 0; 
`;

const TaskCard = styled.div<{ $isDragging: boolean }>`
    background-color: var(--control-background-color);
    padding: 12px;
    border-radius: 6px;
    font-size: 13px;
    color: var(--peak-primary);
    border: 1px solid transparent;
    cursor: grab;
    line-height: 1.4;
    transition: transform 0.1s, box-shadow 0.1s, opacity 0.2s;
    word-break: break-word;
    opacity: ${props => props.$isDragging ? 0.5 : 1};
    
    &:hover {
        border-color: var(--border-color);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    &:active { cursor: grabbing; }
`;

const ColumnFooter = styled.div`
    padding: 12px;
    border-top: 1px solid var(--border-color);
    flex-shrink: 0;
`;

const AddBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background: transparent;
    border: none;
    color: var(--peak-secondary);
    font-size: 13px;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
        color: var(--peak-primary);
        background-color: var(--control-background-color);
    }
`;

// --- INLINE INPUT STYLES ---
const InlineInput = styled.textarea`
    width: 100%;
    background-color: var(--window-background-color);
    border: 1px solid var(--peak-accent);
    color: var(--peak-primary);
    padding: 8px;
    border-radius: 6px;
    font-size: 13px;
    font-family: inherit;
    resize: none;
    outline: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    display: block;
`;

const AddColumnGhost = styled.button`
    min-width: 300px;
    height: 60px;
    border: 1px dashed var(--border-color);
    border-radius: 12px;
    background: transparent;
    color: var(--peak-secondary);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;

    &:hover {
        border-color: var(--peak-accent);
        color: var(--peak-accent);
        background-color: var(--control-background-color);
    }
`;

const DeleteColBtn = styled.button`
    background: transparent;
    border: none;
    color: var(--peak-secondary);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s, color 0.2s;
    padding: 4px;
    
    ${ColumnContainer}:hover & {
        opacity: 1;
    }
    
    &:hover {
        color: #ff4d4d;
    }
`;

// --- INITIAL DATA ---
const InitialData: Column[] = [
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'progress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
];

interface KanbanProps {
    title?: string; // Allow custom title from Tab
}

export default function KanbanBoard({ title }: KanbanProps) {
    const [columns, setColumns] = useState<Column[]>(InitialData);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // DnD State
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
    const [sourceColId, setSourceColId] = useState<string | null>(null);
    const [dragOverColId, setDragOverColId] = useState<string | null>(null);

    // Inline Editing State
    const [addingColId, setAddingColId] = useState<string | null>(null);
    const [newTaskText, setNewTaskText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('peak_kanban');
        if (saved) {
            setColumns(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('peak_kanban', JSON.stringify(columns));
        }
    }, [columns, isLoaded]);

    useEffect(() => {
        if (addingColId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [addingColId]);

    const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);

    // --- DRAG & DROP HANDLERS ---
    
    const handleDragStart = (e: React.DragEvent, taskId: string, colId: string) => {
        setDraggedTaskId(taskId);
        setSourceColId(colId);
        e.dataTransfer.effectAllowed = 'move';
        // Optional: Create a custom drag image if needed, default is usually fine
    };

    const handleDragOver = (e: React.DragEvent, colId: string) => {
        e.preventDefault(); // Necessary to allow dropping
        if (draggedTaskId && colId !== sourceColId) {
            setDragOverColId(colId);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        // Simple debounce or check could be added here, 
        // but for basic column switching, resetting on drop is safest
    };

    const handleDrop = (e: React.DragEvent, targetColId: string) => {
        e.preventDefault();
        setDragOverColId(null);

        if (!draggedTaskId || !sourceColId || sourceColId === targetColId) {
            return;
        }

        const newColumns = [...columns];
        const sourceCol = newColumns.find(c => c.id === sourceColId);
        const targetCol = newColumns.find(c => c.id === targetColId);

        if (sourceCol && targetCol) {
            const taskIndex = sourceCol.tasks.findIndex(t => t.id === draggedTaskId);
            if (taskIndex > -1) {
                const [task] = sourceCol.tasks.splice(taskIndex, 1);
                targetCol.tasks.push(task);
                setColumns(newColumns);
            }
        }
        
        setDraggedTaskId(null);
        setSourceColId(null);
    };

    // --- TASK OPERATIONS ---
    const startAdding = (colId: string) => {
        setAddingColId(colId);
        setNewTaskText("");
    };

    const submitTask = () => {
        if (!newTaskText.trim() || !addingColId) {
            setAddingColId(null);
            return;
        }

        setColumns(cols => cols.map(col => {
            if (col.id === addingColId) {
                return { 
                    ...col, 
                    tasks: [...col.tasks, { id: Date.now().toString(), content: newTaskText.trim() }] 
                };
            }
            return col;
        }));

        setAddingColId(null);
        setNewTaskText("");
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitTask();
        } else if (e.key === 'Escape') {
            setAddingColId(null);
        }
    };

    const handleTaskClick = (colId: string, taskId: string, e: React.MouseEvent) => {
        if (e.metaKey || e.ctrlKey) {
            if(confirm("Delete task?")) {
                setColumns(cols => cols.map(c => {
                    if (c.id === colId) {
                        return { ...c, tasks: c.tasks.filter(t => t.id !== taskId) };
                    }
                    return c;
                }));
            }
        }
    };

    // --- COLUMN OPERATIONS ---
    const addColumn = () => {
        const title = prompt("Column Title:");
        if (!title) return;
        setColumns([...columns, { id: Date.now().toString(), title, tasks: [] }]);
    };

    const deleteColumn = (colId: string) => {
        if (confirm("Delete this column and all its tasks?")) {
            setColumns(columns.filter(c => c.id !== colId));
        }
    };

    return (
        <BoardContainer>
            <Header>
                <div>
                    {/* Use prop title if available, otherwise generic default */}
                    <HeaderTitle>{title || "Task Board"}</HeaderTitle>
                    <HeaderSubtitle>Kanban View</HeaderSubtitle>
                </div>
                <TaskCounter>{totalTasks} tasks</TaskCounter>
            </Header>

            <ScrollArea>
                {columns.map(col => (
                    <ColumnContainer 
                        key={col.id}
                        $isDragOver={dragOverColId === col.id}
                        onDragOver={(e) => handleDragOver(e, col.id)}
                        onDrop={(e) => handleDrop(e, col.id)}
                    >
                        <ColumnHeader>
                            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                {col.title}
                                <Badge>{col.tasks.length}</Badge>
                            </div>
                            <DeleteColBtn onClick={() => deleteColumn(col.id)}>
                                <Trash2 size={14} />
                            </DeleteColBtn>
                        </ColumnHeader>
                        
                        <TaskList>
                            {col.tasks.map(task => (
                                <TaskCard 
                                    key={task.id} 
                                    draggable 
                                    $isDragging={draggedTaskId === task.id}
                                    onDragStart={(e) => handleDragStart(e, task.id, col.id)}
                                    onClick={(e) => handleTaskClick(col.id, task.id, e)}
                                    title="Ctrl/Cmd+Click to delete"
                                >
                                    {task.content}
                                </TaskCard>
                            ))}
                        </TaskList>

                        <ColumnFooter>
                            {addingColId === col.id ? (
                                <InlineInput
                                    ref={inputRef}
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                    onBlur={submitTask}
                                    placeholder="Enter task..."
                                    rows={2}
                                />
                            ) : (
                                <AddBtn onClick={() => startAdding(col.id)}>
                                    <Plus size={14} /> New
                                </AddBtn>
                            )}
                        </ColumnFooter>
                    </ColumnContainer>
                ))}

                <AddColumnGhost onClick={addColumn}>
                    <Plus size={16} /> Add Column
                </AddColumnGhost>
            </ScrollArea>
        </BoardContainer>
    );
}