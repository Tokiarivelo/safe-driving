import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, UserPreference } from '@prisma/client';
import { UserPreferenceUpsertInput } from 'src/dtos/userPreference/upsert.input';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { UserPreferenceCreateInput } from '../dtos/@generated';

@Injectable()
export class UserPreferenceService {
  constructor(private readonly prisma: PrismaService) {}

  // Create strict : échoue si existe déjà
  async createForUser(
    userId: string,
    dto: UserPreferenceCreateInput,
  ): Promise<UserPreference> {
    try {
      // Option A : créer en connectant la relation user
      return await this.prisma.userPreference.create({
        data: {
          ...dto,
          user: { connect: { id: userId } },
        },
      });
    } catch (err: any) {
      // Prisma unique constraint code
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException(
          'User preference already exists for this user',
        );
      }
      // Si user introuvable (relation), Prisma peut renvoyer P2025 ou autre : tu peux détecter et throw NotFound
      throw err;
    }
  }

  private sanitizeInput(dto: Partial<UserPreferenceUpsertInput>) {
    // enlève les champs undefined pour ne pas écraser involontairement
    return Object.fromEntries(
      Object.entries(dto).filter(([_, v]) => v !== undefined),
    ) as Partial<UserPreferenceUpsertInput>;
  }

  /**
   * Upsert user preference and optionally manage preferred vehicles (many-to-many).
   * - vehicleTypeIds => replace the relation (set)
   * - vehicleTypeNames => connectOrCreate by name
   */

  async upsertForUser(
    userId: string,
    dto: UserPreferenceUpsertInput,
  ): Promise<UserPreference> {
    const { preferedVehicleTypeIds, ...rest } = dto;

    const data = this.sanitizeInput(rest);

    // Build relation operations for update/create
    const relationUpdate: any = {};
    const relationCreate: any = {};

    if (
      Array.isArray(preferedVehicleTypeIds) &&
      preferedVehicleTypeIds.length > 0
    ) {
      // Remplace complètement la liste par les ids fournis
      relationUpdate.preferedvelicles = {
        set: preferedVehicleTypeIds.map((id) => ({ id })),
      };
      // Pour la création initiale on connecte (ou on set).
      relationCreate.preferedvelicles = {
        connect: preferedVehicleTypeIds.map((id) => ({ id })),
      };
    }
    // Si ni vehicleTypeIds ni vehicleTypeNames -> on ne touche pas à la relation

    const result = await this.prisma.userPreference.upsert({
      where: { userId },
      update: {
        ...data,
        ...relationUpdate,
      },
      create: {
        ...data,
        user: { connect: { id: userId } },
        ...relationCreate,
      },
      include: { preferedvelicles: true }, // retourne la liste mise à jour
    });

    return result;
  }

  // Option utilitaire : get par userId
  async findByUserId(userId: string) {
    const userPreference = await this.prisma.userPreference.findUnique({
      where: { userId },
    });

    return userPreference;
  }
}
