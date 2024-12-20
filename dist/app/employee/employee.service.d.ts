import { Employee } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export declare class EmployeeService {
    private prisma;
    constructor(prisma: PrismaService);
    createEmployee(name: string, projectIds: string[]): Promise<Employee>;
    createProject(createProjectDto: any): Promise<{
        employees: {
            employeeId: string;
            projectId: string;
        }[];
    } & {
        id: string;
        name: string;
        duration: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllEmployees(): Promise<({
        projects: {
            employeeId: string;
            projectId: string;
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findAllProjects(): Promise<({
        employees: {
            employeeId: string;
            projectId: string;
        }[];
    } & {
        id: string;
        name: string;
        duration: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateEmployeeProjects(employeeId: string, projectIds: any): Promise<{
        projects: {
            employeeId: string;
            projectId: string;
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProjectEmployees(projectId: string, employeeIds: any): Promise<{
        employees: {
            employeeId: string;
            projectId: string;
        }[];
    } & {
        id: string;
        name: string;
        duration: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteEmployee(employeeId: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteProject(projectId: string): Promise<{
        id: string;
        name: string;
        duration: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
