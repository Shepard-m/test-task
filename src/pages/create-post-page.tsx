import React from "react";
import Container from "../components/container";
import FormCreatePost from "../components/form-create-post";
import { TypeForm } from "../const";


export default function CreatePostPage() {


  return (
    <Container>
      <FormCreatePost typeForm={TypeForm.CREATE}/>
    </Container>
  )
}