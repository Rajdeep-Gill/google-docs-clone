'use client';
import Image from 'next/image';
import Link from 'next/link';
import { DocumentInput } from './document-input';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';

import { BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '@/store/use-editor-store';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Avatars } from './avatars';

const TableGrid = ({
  handleClick,
}: {
  handleClick: (rows: number, cols: number) => void;
}) => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);

  const [hoveredCell, setHoveredCell] = useState({ row: 0, col: 0 });

  const handleMouseEnter = (row: number, col: number) => {
    setHoveredCell({ row, col });
    if (row === rows - 1 && rows <= 14) {
      setRows(rows + 1);
    } else if (row < rows - 2) {
      setRows(Math.max(5, rows - 1));
    }

    if (col === cols - 1 && cols <= 14) {
      setCols(cols + 1);
    } else if (col < cols - 2) {
      setCols(Math.max(5, cols - 1));
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell({ row: 0, col: 0 });
  };

  return (
    <div className='flex flex-col gap-1 mt-2 mx-2 mb-0'>
      <div className='flex flex-col'>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className='flex justify-center'>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={cn(
                  'size-5 flex items-center justify-center cursor-pointer border border-gray-300 text-xs rounded-sm',
                  rowIndex <= hoveredCell.row && colIndex <= hoveredCell.col
                    ? 'bg-slate-200'
                    : 'bg-slate-100',
                  'hover:bg-slate-300 transition duration-150'
                )}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(rowIndex + 1, colIndex + 1)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className='w-full text-center text-xs '>
        Size: {hoveredCell.row + 1} x {hoveredCell.col + 1}
      </div>
    </div>
  );
};

export const Navbar = () => {
  const { editor } = useEditorStore();

  const insertTable = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const onSaveJson = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json',
    });
    onDownload(blob, 'document.json');
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: 'text/html',
    });
    onDownload(blob, 'document.html');
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    onDownload(blob, 'document.txt');
  };

  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={36} height={36} />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className='size-4 mr-2' /> Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className='size-4 mr-2' /> Save as JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className='size-4 mr-2' /> Save as HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className='size-4 mr-2' /> Save as PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className='size-4 mr-2' /> Save as text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className='size-4 mr-2' /> New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className='size-4 mr-2' /> Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className='size-4 mr-2' /> Delete
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className='size-4 mr-2' /> Print
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className='size-4 mr-2' /> Undo{' '}
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className='size-4 mr-2' /> Redo{' '}
                    <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable(1, 1)}>
                        1x1
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(2, 2)}>
                        2x2
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(3, 3)}>
                        3x3
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTable(4, 4)}>
                        4x4
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>Custom Size</MenubarSubTrigger>
                        <MenubarSubContent>
                          <TableGrid handleClick={insertTable} />
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className='size-4 mr-2' /> Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => editor?.chain().toggleBold().run()}
                      >
                        <BoldIcon className='size-4 mr-2' /> Bold
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => editor?.chain().toggleItalic().run()}
                      >
                        <ItalicIcon className='size-4 mr-2' /> Italic
                        <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => editor?.chain().toggleUnderline().run()}
                      >
                        <UnderlineIcon className='size-4 mr-2' /> Underline
                        <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => editor?.chain().toggleStrike().run()}
                      >
                        <StrikethroughIcon className='size-4 mr-2' />{' '}
                        <span>Strikethrough&nbsp; &nbsp;</span>
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className='size-4 mr-2' /> Clear
                    Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      <div className='flex gap-3 items-center pl-6'>
        <Avatars />
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  );
};
