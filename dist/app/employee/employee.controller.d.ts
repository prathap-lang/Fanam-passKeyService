import { Employee } from '@prisma/client';
import { EmployeeService } from '../employee/employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    createEmployee(createEmployeeDto: {
        name: string;
        projectIds: string[];
    }): Promise<Employee>;
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
    getAllEmployees(): Promise<{
        status_code: number;
        status: string;
        result: ({
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
        })[];
    }>;
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
    updateEmployeeProjects(id: string, projectIds: string[]): Promise<{
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
    updateProjectEmployees(id: string, employeeIds: string[]): Promise<{
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
    deleteEmployee(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteProject(id: string): Promise<{
        id: string;
        name: string;
        duration: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
