import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { name, email, password } = createUserDto;
      const result = await client.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<User[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findOne(id: number): Promise<User> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE id = $1', [
        id,
      ]);
      if (result.rows.length === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { name, email } = updateUserDto;
      const result = await client.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async remove(id: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    } finally {
      client.release();
    }
  }
}
