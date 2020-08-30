import { UserModel, EntityType } from "./DataTypes"
import { shouldMockApis } from "./ShouldMockApis"
import { getApiBaseUrl } from "./GetApiBaseUrl"

export interface IApiErrorInfo {
    ErrorMessage: string,
    ExceptionType: string,
    FullErrorMessage: string,
    ErrorCode: string | undefined
    InternalErrorMessage: string | undefined
  }

export class ApiError extends Error {
    public readonly statusCode: number
    public readonly body: string
    public readonly errorInfo: IApiErrorInfo | undefined
    constructor(statusCode: number, body: string, message: string) {
      super(message)
      this.statusCode = statusCode
      this.body = body
      this.name = 'ApiError'
      if (body) {
        try {
          const json: IApiErrorInfo = JSON.parse(body)
          this.errorInfo = json
        } catch (error) {
          return
        }
      }
    }
  
    public static isApiError(error: Error): error is ApiError {
      return !!(error as ApiError).statusCode
    }
  
    public static buildString(apiError: ApiError): string {
      let strToPrint: string = ''
      if (apiError) {
        if (apiError.statusCode) {
          strToPrint += apiError.statusCode + '\n'
        }
        if (apiError.errorInfo) {
          if (apiError.errorInfo.ErrorCode) {
            strToPrint += apiError.errorInfo.ErrorCode + '\n'
          }
          if (apiError.errorInfo.ErrorMessage) {
            strToPrint += apiError.errorInfo.ErrorMessage + '\n'
          }
          if (apiError.errorInfo.ExceptionType) {
            strToPrint += apiError.errorInfo.ExceptionType + '\n'
          }
          if (apiError.errorInfo.FullErrorMessage) {
            strToPrint += apiError.errorInfo.FullErrorMessage + '\n'
          }
        }
      }
      return strToPrint
    }
  }

export class RestApi<T> {

    private readonly entityType: EntityType
    constructor(entityType: EntityType) {
        this.entityType = entityType
    }

    public async getEntities(): Promise<T> {
        if (shouldMockApis()) {
            try {
                const entities = this.getMockEntities(this.entityType)
                return entities
            } catch (error) {
                throw error
            }
        }

        const response = await fetch(`${getApiBaseUrl()}/api/generic?type=${this.entityType}`)
        if (response.status === 200) {
          const entities = await response.json()
          return entities
        }
        const error = await RestApi.getErrorFromResponse(response)
        throw error
    }

    public static async getErrorFromResponse(response: Response): Promise<ApiError> {
        const body = await response.text()
        const statusCode = response.status
        return new ApiError(statusCode, body, 'API request failed')
    }

    public getMockEntities(entityType: string): any {
        switch (entityType) {
            case 'user':
                return this.getMockUser()
            default:
                throw new Error(`Unhandled entity type ${entityType}`)
        }
    }

    public getMockUser(): UserModel {
        return (
            {
              uid: '',
              first_name: '',
              last_name: '',
              type: 'seeker',
              bio: '',
              image: '',
              location: ''
            }
        )
    }


}