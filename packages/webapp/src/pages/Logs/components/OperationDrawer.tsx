import { Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { Sheet, SheetClose, SheetContent, SheetTitle } from '../../../components-v2/ui/Sheet';
import { ShowOperation } from '../Operation/Show';

export const OperationDrawer: React.FC<{ operationId: string; onClose: (open: boolean, operationId: string) => void }> = ({ operationId, onClose }) => {
    const [open, setOpen] = useState(true);

    return (
        <Sheet
            open={open}
            onOpenChange={(val) => {
                setOpen(val);
                if (!val) {
                    setTimeout(() => onClose(false, operationId), 300);
                }
            }}
        >
            <SheetContent
                side="right"
                hideCloseButton
                className="w-[1034px] max-w-none sm:max-w-none p-0 bg-bg-elevated text-text-primary border-l-border-muted"
            >
                <SheetTitle className="sr-only">Operation Details</SheetTitle>
                <div className="relative h-full select-text">
                    <div className="absolute right-6 top-[35px]">
                        <SheetClose
                            title="Close"
                            className="bg-transparent text-text-tertiary hover:text-text-primary focus:text-text-primary transition-colors w-8 h-6 flex items-center justify-center"
                        >
                            <Cross1Icon />
                        </SheetClose>
                    </div>
                    <ShowOperation operationId={operationId} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
