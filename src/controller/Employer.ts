import { Response, Request } from "express";
import { prisma } from "../database/config";

class EmployerController {
  async index(request: Request, response: Response) {
    const employees = await prisma.employer.findMany();
    return response.status(200).json(employees);
  }

  async store(request: Request, response: Response) {
    const { name, email } = request.body;

    if (!name || !email) {
      return response.status(401).json({ error: true, message: 'Employer incorrect data.'});
    }
    
    const emailExists = await prisma.employer.findFirst({
      where: { email },
      select: { id: true },
    });
    
    if (emailExists?.id) {
      return response.status(401).json({ error: true, message: 'Emails already exists.'})
    }

    const employer = await prisma.employer.create({ data: { email, name }});
    
    if (!employer.id) {
      return response.status(401).json({ error: true, message: 'Employer not created.'});
    }

    return response.status(200).json({ data: employer, message: 'Employer created.'});
  }
}

export default EmployerController;