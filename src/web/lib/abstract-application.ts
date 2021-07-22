import { Container, interfaces } from 'inversify'

export abstract class Application {
  protected readonly container: Container

  constructor(options: interfaces.ContainerOptions) {
    this.container = new Container(options)

    this.configureServices(this.container)
    this.setup()
  }

  abstract configureServices(container: Container): void
  abstract setup(): Promise<void> | void
}
