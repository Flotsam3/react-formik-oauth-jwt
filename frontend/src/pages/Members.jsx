import React, {useEffect} from 'react';
import { useAuth } from "../components/AuthProvider";
import {Avatar, Button, Card, HStack, Stack, Strong, Text, Flex} from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

export default function Members() {
    const navigate = useNavigate();
    const { user, logout, setUser } = useAuth();

    useEffect(()=>{
        console.log("members", {user});
    },[user])

    async function handleLogout(){
        const response = await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });
    
        if (response.ok) {
            setUser(null);
            navigate("/");
        } else {
            console.error("Logout failed");
        }
    }

  return (
    <Flex justify="center" m="5">
        <Card.Root width="420px">
            <Card.Body>
                <HStack mb="6" gap="3">
                    <Avatar.Root>
                        <Avatar.Image src={user.profileImage} />
                        <Avatar.Fallback name={user?.name} />
                    </Avatar.Root>
                    <Stack gap="0">
                        <Text fontWeight="semibold" textStyle="sm">
                        {user?.name}
                        </Text>
                        <Text color="fg.muted" textStyle="sm">
                        @{user?.email}
                        </Text>
                    </Stack>
                </HStack>
                <Card.Description>
                    <Strong color="fg">{user?.name}, </Strong>
                    come back soon!
                </Card.Description>
            </Card.Body>
            <Card.Footer>
                <Button variant="subtle" colorPalette="red" flex="1" onClick={handleLogout}>
                    <LuX />
                    Logout
                </Button>
            </Card.Footer>
        </Card.Root>
    </Flex>
  )
}
