"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EmployeeService = class EmployeeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEmployee(name, projectIds) {
        const newEmployee = await this.prisma.employee.create({
            data: {
                name,
            },
        });
        await this.prisma.employeeProject.createMany({
            data: projectIds.map((projectId) => ({
                employeeId: newEmployee.id,
                projectId,
            })),
        });
        return this.prisma.employee.findUnique({
            where: { id: newEmployee.id },
            include: { projects: true },
        });
    }
    async createProject(createProjectDto) {
        const { name, duration, employeeIds } = createProjectDto;
        return this.prisma.project.create({
            data: {
                name,
                duration,
                employees: {
                    connect: employeeIds.map((employeeId) => ({ employeeId })),
                },
            },
            include: { employees: true },
        });
    }
    async getAllEmployees() {
        const value = await this.prisma.employee.findMany({
            include: { projects: true },
        });
        console.log(value);
        return value;
    }
    async findAllProjects() {
        return this.prisma.project.findMany({
            include: { employees: true },
        });
    }
    async updateEmployeeProjects(employeeId, projectIds) {
        return this.prisma.employee.update({
            where: { id: employeeId },
            data: {
                projects: {
                    set: projectIds.map((id) => ({ id })),
                },
            },
            include: { projects: true },
        });
    }
    async updateProjectEmployees(projectId, employeeIds) {
        return this.prisma.project.update({
            where: { id: projectId },
            data: {
                employees: {
                    set: employeeIds.map((id) => ({ id })),
                },
            },
            include: { employees: true },
        });
    }
    async deleteEmployee(employeeId) {
        return this.prisma.employee.delete({
            where: { id: employeeId },
        });
    }
    async deleteProject(projectId) {
        return this.prisma.project.delete({
            where: { id: projectId },
        });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map