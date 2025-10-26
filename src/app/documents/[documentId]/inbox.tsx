"use client"
import { BellIcon } from "lucide-react"

import { ClientSideSuspense } from "@liveblocks/react"
import { InboxNotification,InboxNotificationList } from "@liveblocks/react-ui"
import { useInboxNotifications } from "@liveblocks/react/suspense"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Inbox = () => {
    return <ClientSideSuspense fallback={null}>
        <InboxMenu/>
    </ClientSideSuspense>
}

const InboxMenu =  () => {
    const {inboxNotifications} = useInboxNotifications()
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="relative cursor-pointer">
                <BellIcon className="h-5 w-5" color="black"/>
                {inboxNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {inboxNotifications.length}
                    </span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {inboxNotifications.length === 0 ? (
                    <DropdownMenuItem className="justify-center">
                        No new notifications
                    </DropdownMenuItem>
                ) : (
                     <InboxNotificationList>
                   { inboxNotifications.map((notification) => (
                        <InboxNotification
                            key={notification.id}
                            inboxNotification={notification}
                        />
                    ))}
                   </InboxNotificationList>
                   
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}