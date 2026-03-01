interface ticketValues {
  title: string;
  description: string;
}

interface ticketErrors {
  title?: string;
  description?: string;
}

const createTicketValidate = (values: ticketValues): ticketErrors => {
  const errors: ticketErrors = {};

  const title = values.title;
  if (!title) {
    errors.title = "Title is required";
  } else if (title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long";
  } else if (title.trim().length > 100) {
    errors.title = "Title must not exceed 100 characters";
  }

  const description = values.description;
  if (!description) {
    errors.description = "Description is required";
  } else if (description.trim().length < 3) {
    errors.description = "Description must be at least 3 characters long";
  } else if (description.trim().length > 1000) {
    errors.description = "Description must not exceed 1000 characters";
  }

  return errors;
}

export default createTicketValidate;