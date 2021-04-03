import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly JogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.JogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com email ${email} já cadastrado!`,
      );
    }
    const jogadorCriado = new this.JogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.JogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com o id ${_id} não foi encontrado!`,
      );
    }
    await this.JogadorModel.findOneAndUpdate(
      { _id },
      { $set: atualizarJogadorDto },
    ).exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.JogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.JogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com ${_id} não foi encontado!`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {
    return await this.JogadorModel.findOneAndDelete({ _id }).exec();
  }
}
