import { v4 as uuid } from 'uuid';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}
 async create (CreateEmployeeDto: CreateEmployeeDto) {
  const employee = await this.employeeRepository.save(CreateEmployeeDto)
  return Employee
}


  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
    employeeId: id
    })
    return employee;
  }


  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
  const employeeToUpdate = await this.employeeRepository.preload({
    employeeId: id,
    ...updateEmployeeDto,
  });

  if (!employeeToUpdate) {
    throw new NotFoundException(`Employee with id ${id} not found`);
  }

  return this.employeeRepository.save(employeeToUpdate);
}

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return{ 
    message: "Employee deleted"
    }
  }
}
