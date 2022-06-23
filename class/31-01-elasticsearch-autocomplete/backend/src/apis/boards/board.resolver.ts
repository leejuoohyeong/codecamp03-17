import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { Cache } from 'cache-manager'

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
    ) {}

  // @Query(() => String) //getHello: String
  // getHello() {
  //   return this.boardService.aaa();
  // }

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    @Args({ nullable: true, name: 'writer' }) writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBordInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa',createBordInput, {
      ttl: 0,
    })

    // 2. 캐시에서 조회하는 연습
const mycache = await this.cacheManager.get('aaa')
    console.log(mycache);



return "지금은 캐시 테스트 중 !!!"
//////////////////////////////////////////////
    //레디스 연습을 위해서 잠시 주석걸기!!
    // console.log(args);
    // console.log(writer);
    // console.log(title);
    // console.log(contents);

    // console.log(createBordInput);

    // return this.boardService.create();
  }
}
