import React from 'react';
import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";

export default function FormCard({values, handleBlur, handleChange, handleGoogleAuth, handleGithubAuth, register, setRegister, handleLocalAuth}) {
  return (
    <Card.Root maxW="sm" bg="yellow.200" borderColor="orange.500">
        <Card.Header>
            <Card.Title>{register ? "Sign in" : "Sign up"}</Card.Title>
            {!register && <Card.Description>
                Fill in the form below to create an account
            </Card.Description>}
        </Card.Header>
        <Card.Body>
            <Stack gap="4" w="full">
                {!register && <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input type='text' name='name' autoComplete='given-name' onChange={handleChange} value={values.name} onBlur={handleBlur} borderColor="orange.500" outline="none"/>
                </Field.Root>}
                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input type='email' name='email' autoComplete='email' onChange={handleChange} value={values.email} onBlur={handleBlur} borderColor="orange.500" outline="none"/>
                </Field.Root>
                <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <Input type='password' name='password' autoComplete="current-password" onChange={handleChange} value={values.password} onBlur={handleBlur} borderColor="orange.500" outline="none"/>
                </Field.Root>
            </Stack>
        </Card.Body>
        <Card.Footer style={{display: "flex", flexDirection: "column"}}>
            <Button onClick={handleLocalAuth} style={{width: "70%"}} variant="solid">{register ?  "Sign in with Email" : "Register"}</Button>
            <Text onClick={()=>setRegister(!register)} fontWeight="bold" fontStyle="italic" textDecoration="underline" cursor="pointer">{register ? "Create an account" : "Sign in"}</Text>
            {register && <>
                <p>Or sign in with:</p>
                <Button style={{width: "70%"}} variant="solid" onClick={handleGoogleAuth}>Google</Button>
                <Button style={{width: "70%"}} variant="solid" onClick={handleGithubAuth}>Github</Button>
            </>}
        </Card.Footer>
  </Card.Root>
  )
}
