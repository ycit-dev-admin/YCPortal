﻿using AutoMapper;
using System;
using System.Collections.Generic;

namespace PSI.Helpers.IHelper
{
    public interface IMapperConfig
    {
        Dictionary<(Type, Type, int), IMapper> GetConfig<SrcType>();





    }
}
